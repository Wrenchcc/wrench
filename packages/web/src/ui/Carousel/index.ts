import React, { memo } from 'react'
import Image from '../Image'
import { Base } from './styles'

const Carousel = memo(function Carousel({ files }) {
  return (
    <Base>
      {files.edges.map(({ node }) => (
        <Image source={node.uri} key={node.id} />
      ))}
    </Base>
  )
})

export default Carousel
