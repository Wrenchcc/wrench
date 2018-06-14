import React, { Component } from 'react'
import { NetInfo, Animated } from 'react-native'
import withLocalization from 'i18n/withLocalization'
import { Text } from 'ui'
import { COLORS, TOTAL_HEADER_HEIGHT } from 'ui/constants'

const HEIGHT = 40
const DURATION = 150

class NetworkConnectivity extends Component {
  componentDidMount() {
    NetInfo.isConnected.addEventListener('change', this.handleConnectionChange)
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this.handleConnectionChange)
  }

  animatedValue = new Animated.Value(0)

  handleConnectionChange = isConnected => {
    this.handleToast(isConnected)
  }

  handleToast(hide) {
    Animated.timing(this.animatedValue, {
      toValue: hide ? 0 : HEIGHT,
      duration: DURATION,
    }).start()
  }

  render() {
    return (
      <Animated.View
        style={{
          height: this.animatedValue,
          backgroundColor: COLORS.LIGHT_GREY,
          justifyContent: 'center',
          position: 'absolute',
          top: TOTAL_HEADER_HEIGHT,
          left: 0,
          right: 0,
          opacity: 0.98,
        }}
      >
        <Text color="white" medium center fontSize={15}>
          {this.props.t('.noConnection')}
        </Text>
      </Animated.View>
    )
  }
}

export default withLocalization(NetworkConnectivity, 'NetworkConnectivity')
