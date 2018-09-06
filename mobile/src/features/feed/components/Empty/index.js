import React from 'react'
import { Text } from 'ui'
import { Base, Headline } from './styles'

const Empty = () => (
  <Base>
    <Headline medium numberOfLines={0}>
      Get up to speed and follow some projects.
    </Headline>

    <Text color="grey" fontSize={19} lineHeight={25}>
      We’ve selected some categories below you may find interesting.{' '}
    </Text>
  </Base>
)

export default Empty
