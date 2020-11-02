import React from 'react'
import { Image } from 'react-native'
import { check } from 'images'
import { useDynamicColor } from 'utils/hooks'

const Selector = ({ selected }) => {
  const tintColor = useDynamicColor('inverse')

  return selected && <Image source={check} style={{ tintColor }} />
}

export default Selector
