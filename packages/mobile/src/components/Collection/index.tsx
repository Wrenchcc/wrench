import React from 'react'
import { Image } from 'ui'
import { Base, Text } from './styles'

function Collection({ id, name, image, style = {} }) {
  return (
    <Base style={style}>
      <Image source={image} width={60} height={60} borderRadius={60} />
      <Text numberOfLines={1} fontSize={12} center>
        {name}
      </Text>
    </Base>
  )
}

export default Collection
