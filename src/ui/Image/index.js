import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native'
import { IMAGE_PRIORITY } from 'ui/constants'
import { Base, FastImage } from './styles'

const FADE_DURATION = 50

export default class Image extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    borderRadius: PropTypes.number,
    placeholderColor: PropTypes.string,
    priority: PropTypes.string,
  }

  state = {
    opacity: new Animated.Value(0),
  }

  fadeIn = () => {
    Animated.spring(this.state.opacity, {
      toValue: 1,
      delay: 0,
      duration: FADE_DURATION,
      useNativeDriver: true,
    }).start()
  }

  render = () => (
    <Base
      width={this.props.width}
      height={this.props.height}
      borderRadius={this.props.borderRadius}
      placeholderColor={this.props.placeholderColor}
    >
      <Animated.View style={{ opacity: this.state.opacity }}>
        <FastImage
          {...this.props}
          onLoadEnd={this.fadeIn}
          priority={this.props.priority || IMAGE_PRIORITY.NORMAL}
        />
      </Animated.View>
    </Base>
  )
}
