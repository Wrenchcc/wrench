import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Keyboard, LayoutAnimation } from 'react-native'

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

  return LayoutAnimation.create(
    duration,
    LayoutAnimation.Types[easing],
    LayoutAnimation.Properties.opacity
  )
}

export default class KeyboardAccessoryView extends Component {
  static propTypes = {
    style: PropTypes.object,
    animationConfig: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
      .isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      keyboardHeight: 0,
      accessoryHeight: 50,
      visibleAccessoryHeight: 50,
    }

    this.handleKeyboardShow = this.handleKeyboardShow.bind(this)
    this.handleKeyboardHide = this.handleKeyboardHide.bind(this)
  }

  componentWillMount() {
    this.keyboardShowEventListener = Keyboard.addListener(
      'keyboardWillShow',
      this.handleKeyboardShow
    )
    this.keyboardHideEventListener = Keyboard.addListener(
      'keyboardWillHide',
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

    const keyboardAnimate = () => {
      const { animationConfig } = this.props

      LayoutAnimation.configureNext(
        accessoryAnimation(keyboardEvent.duration, keyboardEvent.easing, animationConfig)
      )

      this.setState({
        keyboardHeight: keyboardEvent.endCoordinates.height,
      })
    }

    keyboardAnimate()

    this.setState(prevState => ({
      keyboardHeight: keyboardEvent.endCoordinates.height,
      accessoryHeight: prevState.visibleAccessoryHeight,
    }))
  }

  handleKeyboardHide(keyboardEvent) {
    const { animationConfig } = this.props

    LayoutAnimation.configureNext(
      animationConfig
        || accessoryAnimation(keyboardEvent.duration, keyboardEvent.easing, animationConfig)
    )

    this.setState(prevState => ({
      keyboardHeight: 0,
      accessoryHeight: prevState.accessoryHeight,
    }))
  }

  render() {
    const { accessoryHeight, keyboardHeight } = this.state
    const { style } = this.props

    return (
      <View style={{ height: accessoryHeight }}>
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
