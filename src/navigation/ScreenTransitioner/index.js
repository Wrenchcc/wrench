import React, { Component, Fragment } from 'react'
import { Animated, Dimensions, Easing, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const DEVICE_HEIGHT = Dimensions.get('window').height

export default class ScreenTransitioner extends Component {
  state = {
    firstProgress: new Animated.Value(0),
    transitioning: true,
  }

  // static getDerivedStateFromProps(nextProps) {
  //   return null
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.navigation.state.index !== this.props.navigation.state.index) {
  //     this.transitionToIndex(nextProps.navigation.state.index)
  //   }
  // }

  render() {
    const { transitioning } = this.state

    return (
      <Fragment>
        {transitioning && (
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'white',
              borderTopWidth: 1,
              top: -1,
              transform: [
                {
                  translateY: this.state.firstProgress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, DEVICE_HEIGHT],
                  }),
                },
              ],
            }}
          >
            {this.props.children}
          </Animated.View>
        )}
      </Fragment>
    )
  }
}
