import React from 'react'
import { Text } from 'ui'
import { readableVersion } from 'utils/appVersion'
import { Base } from './styles'

function Footer() {
  return (
    <Base>
      <Text fontSize={15} color="accent">
        {`v${readableVersion}`}
      </Text>
    </Base>
  )
}

export default Footer
