import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Keyboard, LayoutAnimation, Platform } from 'react-native'

const styles = {
  accessory: {
    position: 'absolute',
    right: 0,
    left: 0,
    backgroundColor: '#fff',
  },
}

const accessoryAnimation = (duration, easing, animationConfig = null) => {
  if (animationConfig) {
    if (typeof animationConfig === 'function') {
      return animationConfig(duration, easing)
    }
    return animationConfig
  }

  if (Platform.OS === 'android') {
    return {
      duration: 200,
      create: {
        duration: 200,
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.linear,
      },
    }
  }

  return LayoutAnimation.create(
    duration,
    LayoutAnimation.Types[easing],
    LayoutAnimation.Properties.opacity
  )
}

export default class KeyboardAccessoryView extends Component {
  static propTypes = {
    style: PropTypes.object,
    animateOn: PropTypes.oneOf(['ios', 'android', 'all', 'none']),
    animationConfig: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    onKeyboardShowDelay: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    androidWindowSoftInputAdjustResize: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
      .isRequired,
  }

  static defaultProps = {
    animateOn: 'ios',
    androidWindowSoftInputAdjustResize: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      keyboardHeight: 0,
      accessoryHeight: 50,
      visibleAccessoryHeight: 50,
      isKeyboardVisible: false,
    }

    this.handleKeyboardShow = this.handleKeyboardShow.bind(this)
    this.handleKeyboardHide = this.handleKeyboardHide.bind(this)
  }

  componentWillMount() {
    const keyboardShowEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
    const keyboardHideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'

    this.keyboardShowEventListener = Keyboard.addListener(
      keyboardShowEvent,
      this.handleKeyboardShow
    )
    this.keyboardHideEventListener = Keyboard.addListener(
      keyboardHideEvent,
      this.handleKeyboardHide
    )
  }

  componentWillUnmount() {
    this.keyboardShowEventListener.remove()
    this.keyboardHideEventListener.remove()
  }

  handleChildrenLayout = layoutEvent => {
    this.setState({
      visibleAccessoryHeight: layoutEvent.nativeEvent.layout.height,
      accessoryHeight: layoutEvent.nativeEvent.layout.height,
    })
  }

  handleKeyboardShow(keyboardEvent) {
    if (!keyboardEvent.endCoordinates) {
      return
    }

    const keyboardHeight = Platform.select({
      ios: keyboardEvent.endCoordinates.height,
      android: this.props.androidWindowSoftInputAdjustResize && keyboardEvent.endCoordinates.height,
    })

    const keyboardAnimate = () => {
      const { animationConfig, animateOn } = this.props

      if (animateOn === 'all' || Platform.OS === animateOn) {
        LayoutAnimation.configureNext(
          accessoryAnimation(keyboardEvent.duration, keyboardEvent.easing, animationConfig)
        )
      }

      this.setState({
        isKeyboardVisible: true,
        keyboardHeight,
      })
    }

    if (Platform.OS === 'ios' || typeof this.props.onKeyboardShowDelay !== 'number') {
      keyboardAnimate()
    } else {
      setTimeout(() => {
        keyboardAnimate()
      }, this.props.onKeyboardShowDelay)
    }

    this.setState(prevState => ({
      isKeyboardVisible: true,
      keyboardHeight: keyboardEvent.endCoordinates.height,
      accessoryHeight: prevState.visibleAccessoryHeight,
    }))
  }

  handleKeyboardHide(keyboardEvent) {
    const { animateOn, animationConfig } = this.props

    if (animateOn === 'all' || Platform.OS === animateOn) {
      LayoutAnimation.configureNext(
        animationConfig
          || accessoryAnimation(keyboardEvent.duration, keyboardEvent.easing, animationConfig)
      )
    }

    this.setState(prevState => ({
      isKeyboardVisible: false,
      keyboardHeight: 0,
      accessoryHeight: prevState.accessoryHeight,
    }))
  }

  render() {
    const { isKeyboardVisible, accessoryHeight, keyboardHeight } = this.state
    const { style } = this.props

    return (
      <View style={{ height: isKeyboardVisible || accessoryHeight }}>
        <View
          style={[
            styles.accessory,
            style,
            {
              bottom: keyboardHeight,
              height: accessoryHeight,
            },
          ]}
        >
          <View onLayout={this.handleChildrenLayout}>{this.props.children}</View>
        </View>
      </View>
    )
  }
}
