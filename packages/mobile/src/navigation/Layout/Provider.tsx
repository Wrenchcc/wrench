import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Animated from 'react-native-reanimated'
import { isAndroid } from 'utils/platform'
import { scrollToOffset } from 'navigation/Scrollables/utils'
import { NAVIGATION } from 'navigation/constants'
import { ListContext } from './context'

const {
  or,
  and,
  multiply,
  greaterThan,
  defined,
  call,
  event,
  Value,
  block,
  cond,
  set,
  add,
  startClock,
  clockRunning,
  stopClock,
  Clock,
  sub,
  spring,
  neq,
  eq,
  greaterOrEq,
  diff,
  max,
  min,
} = Animated

export default class Provider extends Component {
  static propTypes = {
    children: PropTypes.any,
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        Component: PropTypes.any,
      })
    ),
  }

  dragging = new Value(0)

  scrollY = new Value(0)

  scrollYClamped = new Value(0)

  scrollYTarget = new Value(0)

  scrollYDiff = new Value(0)

  translateY = new Value(0)

  targetTranslateY = new Value(0)

  endDragVelocity = new Value(0)

  translateYTarget = new Value(0)

  translateYSnap = new Value(0)

  activeTab = new Value(0)

  lastSyncScroll = 0

  isAndroid = new Value(isAndroid ? 1 : 0)

  constructor(props) {
    super(props)

    const routes = props.routes || []

    this.refList = new Array(routes.length)

    const {
      activeTab,
      dragging,
      scrollY,
      scrollYClamped,
      scrollYDiff,
      translateY,
      endDragVelocity,
      translateYSnap,
    } = this

    this.state = {
      index: 0,
    }

    const state = {
      finished: new Value(0),
      velocity: new Value(0),
      position: new Value(0),
      time: new Value(0),
    }

    const config = {
      damping: 1,
      mass: 1,
      stiffness: 50,
      overshootClamping: true,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
      toValue: new Value(0),
    }

    const clock = new Clock()

    const snapOffset = cond(
      eq(dragging, 0),
      cond(
        or(
          eq(isAndroid, 0),
          and(
            neq(translateY, this.initialScroll),
            neq(translateY, -NAVIGATION.TOP_BAR_HEIGHT)
          )
        ),
        block([
          cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.velocity, endDragVelocity),
            set(state.position, 0),
            set(
              translateYSnap,
              cond(
                greaterOrEq(translateY, NAVIGATION.TOP_BAR_HEIGHT / -2),
                0,
                -NAVIGATION.TOP_BAR_HEIGHT
              )
            ),
            set(
              config.toValue,
              cond(
                greaterThan(scrollY, this.initialScroll + NAVIGATION.TOP_BAR_HEIGHT),
                sub(translateYSnap, translateY),
                multiply(-1, translateY)
              )
            ),
            call([translateYSnap], this.syncScroll),
            startClock(clock),
          ]),
          spring(clock, state, config),
          cond(state.finished, [
            set(translateY, add(translateY, state.position)),
            stopClock(clock),
          ]),
          state.position,
        ]),
        block([call([translateY], this.syncScroll)])
      ),
      stopClock(clock)
    )

    this.finalTranslateY = add(translateY, snapOffset)

    const events = routes.length ? routes : [1]

    this.handleScroll = events.map((_, i) => event(
      [
        {
          nativeEvent: ({ contentOffset }) => cond(
            eq(activeTab, i),
            block([
              set(scrollY, contentOffset.y),
              set(scrollYClamped, max(this.initialScroll, contentOffset.y)),
              set(scrollYDiff, diff(scrollYClamped)),
              cond(
                neq(dragging, 0),
                [
                  set(
                    translateY,
                    min(0, max(-NAVIGATION.TOP_BAR_HEIGHT, sub(translateY, scrollYDiff)))
                  ),
                  translateY,
                ],
                0
              ),
            ]),
            0
          ),
        },
      ],
      { useNativeDriver: true }
    ))

    /*
      Some edge cases between ios and android
      zoomScale is set ios
      target is set on android

      If we found any way how to set dragging to "1"
      without "fake" values like zoomScale and target
      that would be great
     */
    this.handleBeginDrag = events.map(() => event(
      [
        {
          nativeEvent: ({ zoomScale, target }) =>
              block([cond(defined(target), set(dragging, target), set(dragging, zoomScale))]), // eslint-disable-line
        },
      ],
      { useNativeDriver: true }
    ))

    this.handleEndDrag = events.map(() => event(
      [
        {
          nativeEvent: ({ contentOffset, velocity }) => block([
            set(dragging, contentOffset.x),
            set(endDragVelocity, velocity.y),
            set(scrollY, contentOffset.y),
          ]),
        },
      ],
      { useNativeDriver: true }
    ))
  }

  setListRef = (index, ref) => {
    this.refList[index] = ref
  }

  get contentInset() {
    return (
      NAVIGATION.TOP_BAR_HEIGHT
      + NAVIGATION.STATUS_BAR_HEIGHT
      + NAVIGATION.LIST_INSET_TOP
    )
  }

  get initialScroll() {
    if (isAndroid) {
      return 0
    }

    return -this.contentInset
  }

  get hasTabs() {
    return Array.isArray(this.props.routes) && this.props.routes.length > 0
  }

  get contextProvider() {
    return {
      handleTabChange: this.handleTabChange,
      hasTabs: this.hasTabs,
      headerHeight: NAVIGATION.TOP_BAR_HEIGHT,
      index: this.state.index,
      initialScroll: this.initialScroll,
      contentInset: this.contentInset,
      routes: this.props.routes,
      translateY: this.finalTranslateY,
      handleScroll: this.handleScroll,
      handleBeginDrag: this.handleBeginDrag,
      handleEndDrag: this.handleEndDrag,
      setListRef: this.setListRef,
    }
  }

  syncScroll = ([translateY]) => {
    if (this.lastSyncScroll === translateY || this.refList.length === 1) {
      return null
    }

    this.lastSyncScroll = translateY

    const offset = translateY === 0
      ? this.initialScroll
      : isAndroid
        ? -translateY
        : this.initialScroll - translateY

    this.refList.forEach((ref, index) => {
      if (this.state.index !== index && ref) {
        scrollToOffset(ref, offset)
      }
    })

    return null
  }

  handleTabChange = (index, initial = false) => {
    if (index === this.state.index && !initial) {
      return null
    }

    this.activeTab.setValue(index)

    this.setState({
      index,
    })

    return null
  }

  render() {
    return (
      <ListContext.Provider value={this.contextProvider}>
        {this.props.children}
      </ListContext.Provider>
    )
  }
}
