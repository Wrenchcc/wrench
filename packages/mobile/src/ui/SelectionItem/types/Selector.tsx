import React from 'react'
import { Image } from 'react-native'
import { check } from 'images'
import PlatformColor from 'ui/PlatformColor'

const Selector = ({ selected }) => {
  return selected && <Image source={check} style={{ tintColor: PlatformColor.inverse }} />
}

export default Selector
