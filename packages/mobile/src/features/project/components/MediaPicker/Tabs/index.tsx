import React, { PureComponent } from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { BaseButton, PanGestureHandler, State } from 'react-native-gesture-handler'
import { sum } from 'ramda'
import { FONTS } from 'ui/constants'

const inactiveOpacity = 0.55
const tabPadding = 15

const {
  divide,
  add,
  and,
  block,
  Clock,
  clockRunning,
  cond,
  decay,
  eq,
  event,
  greaterThan,
  interpolate,
  max,
  min,
  multiply,
  neq,
  onChange,
  set,
  startClock,
  stopClock,
  sub,
  Value,
} = Animated

const clamp = (val, lower, upper) => min(max(val, lower), upper)

function runDecay(clock, value, velocity, lower, upper, shouldDecay) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    velocity: new Value(0),
  }

  const config = { deceleration: 0.995 }

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, velocity),
      set(state.position, value),
      set(state.time, 0),
      startClock(clock),
    ]),
    decay(clock, state, config),
    cond(state.finished, [stopClock(clock), set(shouldDecay, 0)]),
    set(value, clamp(state.position, lower, upper)),
  ]
}

const styles = {
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flexGrow: 1,
    height: 60,
  },
  tab: {
    alignItems: 'center',
  },
}

class Tabs extends PureComponent {
  private scrollTranslateX = new Value(0)

  private offsetX = new Value(0)

  private shouldDecay = new Value(0)

  private totalTabWidth = new Value(0)

  constructor(props) {
    super(props)

    const totalTabPadding = (props.navigationState.routes.length + 1) * tabPadding * 2

    this.state = {
      sizes: {},
      totalTabWidth: totalTabPadding,
      translateXMap: [],
    }

    this.inputRange = this.routes.map((x, i) => i)
    this.springClock = new Clock()

    this.positionTranslateX = interpolate(this.props.position, {
      inputRange: [0, this.routes.length - 1],
      outputRange: [0, multiply(-1, sub(this.totalTabWidth, this.props.layout.width))],
    })

    this.boundLeft = multiply(-1, this.positionTranslateX)
    this.boundRight = multiply(-1, sub(this.totalTabWidth, this.props.layout.width, this.boundLeft))

    this.finalTranslateX = cond(
      greaterThan(this.totalTabWidth, this.props.layout.width),
      add(this.positionTranslateX, this.scrollTranslateX),
      0
    )

    this.onGestureEvent = event(
      [
        {
          nativeEvent: ({ translationX, velocityX, state }) => {
            const minTranslateX = multiply(
              -1,
              sub(this.totalTabWidth, this.props.layout.width, this.boundLeft)
            )
            const maxTranslateX = multiply(-1, this.positionTranslateX)
            const translateX = clamp(add(translationX, this.offsetX), minTranslateX, maxTranslateX)
            const decayClock = new Clock()

            return block([
              onChange(
                this.props.position,
                cond(neq(this.scrollTranslateX, 0), [
                  set(this.shouldDecay, 0),
                  set(this.scrollTranslateX, 0),
                  set(this.offsetX, 0),
                ])
              ),
              cond(eq(state, State.ACTIVE), [
                stopClock(decayClock),
                set(this.scrollTranslateX, translateX),
                set(this.shouldDecay, 1),
              ]),
              cond(and(eq(state, State.END), eq(this.shouldDecay, 1)), [
                cond(clockRunning(decayClock), 0, [set(this.offsetX, this.scrollTranslateX)]),
                set(
                  this.scrollTranslateX,
                  runDecay(
                    decayClock,
                    this.offsetX,
                    velocityX,
                    minTranslateX,
                    maxTranslateX,
                    this.shouldDecay
                  )
                ),
              ]),
            ])
          },
        },
      ],
      {
        useNativeDriver: true,
      }
    )
  }

  get routes() {
    return this.props.navigationState.routes
  }

  private addTabSize = index => evt => {
    const { width } = evt.nativeEvent.layout

    this.setState(
      ({ sizes, totalTabWidth }) => ({
        sizes: {
          ...sizes,
          [index]: width,
        },
        totalTabWidth: width + totalTabWidth,
      }),
      () => {
        this.totalTabWidth.setValue(this.state.totalTabWidth)

        const sizes = Object.values(this.state.sizes)

        if (sizes.length === this.routes.length) {
          this.setState({
            translateXMap: sizes.map((s, i) => sum(sizes.slice(0, i)) + tabPadding * 2 * (i + 1)),
          })
        }
      }
    )
  }

  private getTranslateX = index => this.state.translateXMap[index] || 0

  private getSizeByIndex = index => this.state.sizes[index] || 0

  private getTabOpacityByCurrentIndex = currentIndex => index =>
    index === currentIndex ? 1 : inactiveOpacity

  private interpolate = outputFunc =>
    interpolate(this.props.position, {
      inputRange: this.inputRange,
      outputRange: this.inputRange.map(outputFunc),
    })

  private isFirst = index => index === 0

  private isLast = index => index === this.routes.length - 1

  private onTabPress = route => {
    this.props.jumpTo(route.key)
  }

  private render() {
    return (
      <PanGestureHandler
        onGestureEvent={this.onGestureEvent}
        onHandlerStateChange={this.onGestureEvent}
        hitSlop={{ top: 10, bottom: 10 }}
      >
        <Animated.View
          style={{
            transform: [
              {
                translateX: this.finalTranslateX,
              },
            ],
            width: this.routes.length * 150,
          }}
        >
          <View style={styles.container}>
            {this.routes.map((route, index) => {
              const opacity = this.interpolate(this.getTabOpacityByCurrentIndex(index))

              return (
                <BaseButton
                  key={route.key}
                  onPress={() => this.onTabPress(route)}
                  style={[
                    {
                      paddingLeft: this.isFirst(index) ? 20 : tabPadding,
                      paddingRight: this.isLast(index) ? 20 : tabPadding,
                    },
                  ]}
                >
                  <View onLayout={this.addTabSize(index)}>
                    <Animated.View style={{ opacity }}>
                      <Animated.Text
                        style={{ fontFamily: FONTS.MEDIUM, color: 'white', fontSize: 15 }}
                      >
                        {route.title}
                      </Animated.Text>
                    </Animated.View>
                  </View>
                </BaseButton>
              )
            })}
          </View>
        </Animated.View>
      </PanGestureHandler>
    )
  }
}

export default Tabs
