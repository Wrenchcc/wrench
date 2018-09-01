import React from 'react'
import DeviceInfo from 'react-native-device-info'
import { Text } from 'ui'
import { Base } from './styles'

const appVersion = `v${DeviceInfo.getVersion()}.${DeviceInfo.getBuildNumber()}`

const Footer = () => (
  <Base>
    <Text fontSize={15} color="light_grey">
      {appVersion}
    </Text>
  </Base>
)

export default Footer
