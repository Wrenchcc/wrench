import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Animated } from 'react-native'

const DEFAULT_BAR_HEIGHT = 3

export default class ProgressBar extends Component {
  static propTypes = {
    progress: PropTypes.number,
    backgroundColor: PropTypes.string,
    borderRadius: PropTypes.number,
    barHeight: PropTypes.number,
    fillColor: PropTypes.string,
    opacity: PropTypes.number,
  }

  static defaultProps = {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 3,
    barHeight: DEFAULT_BAR_HEIGHT,
    fillColor: 'white',
    opacity: 1,
  }

  constructor(props) {
    super(props)

    this.state = { progress: new Animated.Value(props.progress || 0) }
  }

  componentDidUpdate(prevProps) {
    if (this.props.progress >= 0 && this.props.progress !== prevProps.progress) {
      this.update()
    }
  }

  update = () => {
    Animated.timing(this.state.progress, {
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
