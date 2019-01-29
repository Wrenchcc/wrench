import React from 'react'
import DeviceInfo from 'react-native-device-info'
import { Text } from 'ui'
import { Base } from './styles'

const appVersion = `v${DeviceInfo.getVersion()}.${DeviceInfo.getBuildNumber()}`

export default function Footer() {
  return (
    <Base>
      <Text fontSize={15} color="light_grey">
        {appVersion}
      </Text>
    </Base>
  )
}
