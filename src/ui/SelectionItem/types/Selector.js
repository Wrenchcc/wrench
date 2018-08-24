import React from 'react'
import { Image } from 'react-native'
import { check } from 'images'

const Selector = ({ selected }) => selected && <Image source={check} />

export default Selector
