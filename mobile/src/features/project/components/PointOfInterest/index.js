import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated, View } from 'react-native'
import { equals } from 'ramda'
import { COLORS } from 'ui/constants'

const DEFAULT_SIZE = 60
const DEFAULT_OPACITY = 1
const DEFAULT_SCALE = 1

export default class PointOfInterest extends PureComponent {
  opacity = new Animated.Value(DEFAULT_OPACITY)

  scale = new Animated.Value(2)

  static propTypes = {
    coordinates: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  }

  componentDidUpdate(prevProps) {
    if (!equals(this.props.coordinates, prevProps.coordinates)) {
      this.scale.setValue(2)
      this.handleAnimation()
    }
  }

  handleAnimation() {
    Animated.sequence([
      Animated.parallel(
        [
          Animated.spring(this.scale, {
            toValue: DEFAULT_SCALE,
          }),
          Animated.loop(
            Animated.timing(this.opacity, {
              toValue: 0.8,
              duration: 300,
            }),
            { iterations: 4 }
          ),
        ],
        { useNativeDriver: true }
      ),
      Animated.timing(this.opacity, {
        toValue: 0.4,
        duration: 400,
      }),
    ]).start()
  }

  render() {
    if (!this.props.coordinates) return null

    return (
      <Animated.View
        pointerEvents="none"
        style={{
          opacity: this.opacity,
          width: DEFAULT_SIZE,
          height: DEFAULT_SIZE,
          borderWidth: 1,
          borderColor: COLORS.ORANGE,
          position: 'relative',
          zIndex: 100,
          top: this.props.coordinates.y - DEFAULT_SIZE / 2,
          left: this.props.coordinates.x - DEFAULT_SIZE / 2,
          transform: [{ scale: this.scale }],
        }}
      >
        <View
          style={{
            position: 'absolute',
            width: 10,
            borderTopWidth: 1,
            borderColor: COLORS.ORANGE,
            top: '50%',
          }}
        />

        <View
          style={{
            position: 'absolute',
            width: 10,
            borderTopWidth: 1,
            borderColor: COLORS.ORANGE,
            top: '50%',
            right: 0,
          }}
        />

        <View
          style={{
            position: 'absolute',
            height: 10,
            borderRightWidth: 1,
            borderColor: COLORS.ORANGE,
            bottom: 0,
            left: '50%',
          }}
        />

        <View
          style={{
            position: 'absolute',
            height: 10,
            borderRightWidth: 1,
            borderColor: COLORS.ORANGE,
            top: 0,
            left: '50%',
          }}
        />
      </Animated.View>
    )
  }
}
