import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Animated } from 'react-native'

const DEFAULT_BAR_HEIGHT = 3

export default class ProgressBar extends Component {
  static propTypes = {
    backgroundColor: PropTypes.string,
    barHeight: PropTypes.number,
    borderRadius: PropTypes.number,
    fillColor: PropTypes.string,
    opacity: PropTypes.number,
    progress: PropTypes.number,
  }

  static defaultProps = {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    barHeight: DEFAULT_BAR_HEIGHT,
    borderRadius: 3,
    fillColor: 'white',
    opacity: 1,
  }

  constructor(props) {
    super(props)

    this.state = {
      progress: new Animated.Value(props.progress || 0),
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.progress >= 0 && this.props.progress !== prevProps.progress) {
      this.updateProgressBar()
    }
  }

  updateProgressBar = () => {
    Animated.spring(this.state.progress, {
      toValue: this.props.progress,
      useNativeDive: true,
    }).start()
  }

  render() {
    const animated = this.state.progress.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
      extrapolate: 'clamp',
    })

    return (
      <View
        style={{
          overflow: 'hidden',
          opacity: this.props.opacity,
          height: this.props.barHeight,
          backgroundColor: this.props.backgroundColor,
          borderRadius: this.props.borderRadius,
        }}
      >
        <Animated.View
          style={{
            width: animated,
            backgroundColor: this.props.fillColor,
            height: this.props.barHeight,
          }}
        />
      </View>
    )
  }
}
