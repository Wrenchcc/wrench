import React, { Component } from 'react'
import { NetInfo, Animated } from 'react-native'
import { translate } from 'react-i18next'
import { Text } from 'ui'
import { COLORS, TOTAL_HEADER_HEIGHT } from 'ui/constants'

const HEIGHT = 40

class NetworkConnectivity extends Component {
  animatedValue = new Animated.Value(0)

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange)
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange)
  }

  handleConnectionChange = isConnected => {
    this.handleToast(isConnected)
  }

  handleToast(hide) {
    Animated.spring(this.animatedValue, {
      toValue: hide ? 0 : HEIGHT,
      bounciness: 0,
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
          {this.props.t('NetworkConnectivity:noConnection')}
        </Text>
      </Animated.View>
    )
  }
}

export default translate('NetworkConnectivity')(NetworkConnectivity)
