import React, { Component } from 'react'
import { Animated } from 'react-native'
import { Base, FastImage } from './styles'

export default class Image extends Component {
  state = {
    opacity: new Animated.Value(0),
  }

  fadeIn = () => {
    Animated.spring(this.state.opacity, {
      toValue: 1,
      delay: 0,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }

  render = () => (
    <Base
      width={this.props.width}
      height={this.props.height}
      borderRadius={this.props.borderRadius}
    >
      <Animated.View style={{ opacity: this.state.opacity }}>
        <FastImage {...this.props} onLoad={this.fadeIn} />
      </Animated.View>
    </Base>
  )
}
