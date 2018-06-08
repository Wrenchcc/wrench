import React from 'react'
import { getVersion, getBuildNumber } from 'react-native-device-info'
import { Text } from 'ui'
import { Base } from './styles'

const Footer = () => (
  <Base>
    <Text fontSize={15} color="light_grey">{`v${getVersion()}.${getBuildNumber()}`}</Text>
  </Base>
)

export default Footer
