import React from 'react'
import Text from 'ui/Text'
import { Base } from './styles'

function Banner({ content, type = null }) {
  return (
    <Base type={type}>
      <Text color="white" medium center fontSize={15}>
        {content}
      </Text>
    </Base>
  )
}

export default Banner
