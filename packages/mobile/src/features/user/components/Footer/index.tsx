import React from 'react'
import { Text } from 'ui'
import AppVersion from 'utils/appVersion'
import { Base } from './styles'

function Footer() {
  return (
    <Base>
      <Text fontSize={15} color="accent">
        {AppVersion}
      </Text>
    </Base>
  )
}

export default Footer
