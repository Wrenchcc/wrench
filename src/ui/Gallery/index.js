/* eslint-disable */
import React from 'react'
import { uniq } from 'ramda'
import { Base, Container, Cell, Image, Transform } from './styles'

const HEIGHT = 180

const One = ({ images }) => <Image source={images[0]} height={HEIGHT} />

const Two = ({ images }) => (
  <Container>
    <Cell size={1 / 2}>
      <Image source={images[0]} height={HEIGHT} borderRight />
    </Cell>
    <Cell size={1 / 2}>
      <Image source={images[1]} height={HEIGHT} borderLeft />
    </Cell>
  </Container>
)

const Three = ({ images }) => (
  <Container>
    <Cell size={1 / 2}>
      <Image source={images[0]} height={HEIGHT} borderRight />
    </Cell>
    <Cell size={1 / 2}>
      <Image source={images[1]} height={HEIGHT / 2} borderLeft />
      <Image source={images[2]} height={HEIGHT / 2} borderLeft borderTop />
    </Cell>
  </Container>
)

const Four = ({ images }) => (
  <Container>
    <Cell size={1 / 2}>
      <Image source={images[0]} height={HEIGHT / 2} borderRight borderBottom />
      <Image source={images[1]} height={HEIGHT / 2} borderRight borderTop />
    </Cell>
    <Cell size={1 / 2}>
      <Image source={images[2]} height={HEIGHT / 2} borderLeft borderBottom />
      <Image source={images[3]} height={HEIGHT / 2} borderLeft borderTop />
    </Cell>
  </Container>
)

const Five = ({ images }) => (
  <Container>
    <Cell size={1 / 3}>
      <Image source={images[0]} height={HEIGHT} borderRight />
    </Cell>
    <Cell size={1 / 3}>
      <Image source={images[1]} height={HEIGHT / 2} borderRight borderBottom />
      <Image source={images[2]} height={HEIGHT / 2} borderRight borderTop />
    </Cell>
    <Cell size={1 / 3}>
      <Image source={images[3]} height={HEIGHT / 2} borderLeft borderBottom />
      <Image source={images[4]} height={HEIGHT / 2} borderLeft borderTop />
    </Cell>
  </Container>
)

const Six = ({ images }) => (
  <Container>
    <Cell size={1 / 3}>
      <Image source={images[0]} height={HEIGHT / 2} borderRight borderBottom />
      <Image source={images[1]} height={HEIGHT / 2} borderRight borderTop />
    </Cell>
    <Cell size={1 / 3}>
      <Image source={images[2]} height={HEIGHT / 2} borderRight borderLeft borderBottom />
      <Image source={images[3]} height={HEIGHT / 2} borderRight borderLeft borderTop />
    </Cell>
    <Cell size={1 / 3}>
      <Image source={images[4]} height={HEIGHT / 2} borderLeft borderBottom />
      <Image source={images[5]} height={HEIGHT / 2} borderLeft borderTop />
    </Cell>
  </Container>
)

const Grid = ({ images }) => {
  switch (images.length) {
    case 1:
      return <One images={images} />
    case 2:
      return <Two images={images} />
    case 3:
      return <Three images={images} />
    case 4:
      return <Four images={images} />
    case 5:
      return <Five images={images} />
    case 6:
      return <Six images={images} />
    default:
      return null
  }
}

const Gallery = ({ images }) => {
  const uniqImages = uniq(images)

  return (
    <Base>
      <Transform enabled={uniqImages.length >= 2}>
        <Grid images={uniqImages} />
      </Transform>
    </Base>
  )
}

export default Gallery
