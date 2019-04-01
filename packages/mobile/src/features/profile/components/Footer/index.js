import React, { memo } from 'react'
import { Text } from 'ui'
import { appVersion } from 'utils/constants'
import { Base } from './styles'

export default memo(function Footer() {
  return (
    <Base>
      <Text fontSize={15} color="light_grey">
        {appVersion}
      </Text>
    </Base>
  )
})
