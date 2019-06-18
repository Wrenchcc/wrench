import React from 'react'
import { Text } from 'ui'
import { appVersion } from 'utils/constants'
import { Base } from './styles'

function Footer() {
  return (
    <Base>
      <Text fontSize={15} color="light_grey">
        {appVersion}
      </Text>
    </Base>
  )
}

export default Footer
