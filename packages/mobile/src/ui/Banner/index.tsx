import React from 'react'
import Text from 'ui/Text'
import { Base } from './styles'
import { TOAST_TYPES } from 'utils/enums'

function Banner({ content, type }: { content: string; type?: TOAST_TYPES }) {
  return (
    <Base type={type}>
      <Text color="white" medium center fontSize={15}>
        {content}
      </Text>
    </Base>
  )
}

export default Banner
