import React from 'react'
import { uniq } from 'ramda'
import { Base, Container, Cell, Image, Transform } from './styles'

const HEIGHT = 180

const One = ({ imageUrls }) => <Image source={{ uri: imageUrls[0] }} height={HEIGHT} />

const Two = ({ imageUrls }) => (
  <Container>
    <Cell size={1 / 2}>
      <Image source={{ uri: imageUrls[0] }} height={HEIGHT} borderRight />
    </Cell>
    <Cell size={1 / 2}>
      <Image source={{ uri: imageUrls[1] }} height={HEIGHT} borderLeft />
    </Cell>
  </Container>
)

const Three = ({ imageUrls }) => (
  <Container>
    <Cell size={1 / 2}>
      <Image source={{ uri: imageUrls[0] }} height={HEIGHT} borderRight />
    </Cell>
    <Cell size={1 / 2}>
      <Image source={{ uri: imageUrls[1] }} height={HEIGHT / 2} borderLeft />
      <Image source={{ uri: imageUrls[2] }} height={HEIGHT / 2} borderLeft borderTop />
    </Cell>
  </Container>
)

const Four = ({ imageUrls }) => (
  <Container>
    <Cell size={1 / 2}>
      <Image source={{ uri: imageUrls[0] }} height={HEIGHT / 2} borderRight borderBottom />
      <Image source={{ uri: imageUrls[1] }} height={HEIGHT / 2} borderRight borderTop />
    </Cell>
    <Cell size={1 / 2}>
      <Image source={{ uri: imageUrls[2] }} height={HEIGHT / 2} borderLeft borderBottom />
      <Image source={{ uri: imageUrls[3] }} height={HEIGHT / 2} borderLeft borderTop />
    </Cell>
  </Container>
)

const Five = ({ imageUrls }) => (
  <Container>
    <Cell size={1 / 3}>
      <Image source={{ uri: imageUrls[0] }} height={HEIGHT} borderRight />
    </Cell>
    <Cell size={1 / 3}>
      <Image source={{ uri: imageUrls[1] }} height={HEIGHT / 2} borderRight borderBottom />
      <Image source={{ uri: imageUrls[2] }} height={HEIGHT / 2} borderRight borderTop />
    </Cell>
    <Cell size={1 / 3}>
      <Image source={{ uri: imageUrls[3] }} height={HEIGHT / 2} borderLeft borderBottom />
      <Image source={{ uri: imageUrls[4] }} height={HEIGHT / 2} borderLeft borderTop />
    </Cell>
  </Container>
)

const Six = ({ imageUrls }) => (
  <Container>
    <Cell size={1 / 3}>
      <Image source={{ uri: imageUrls[0] }} height={HEIGHT / 2} borderRight borderBottom />
      <Image source={{ uri: imageUrls[1] }} height={HEIGHT / 2} borderRight borderTop />
    </Cell>
    <Cell size={1 / 3}>
      <Image
        source={{ uri: imageUrls[2] }}
        height={HEIGHT / 2}
        borderRight
        borderLeft
        borderBottom
      />
      <Image source={{ uri: imageUrls[3] }} height={HEIGHT / 2} borderRight borderLeft borderTop />
    </Cell>
    <Cell size={1 / 3}>
      <Image source={{ uri: imageUrls[4] }} height={HEIGHT / 2} borderLeft borderBottom />
      <Image source={{ uri: imageUrls[5] }} height={HEIGHT / 2} borderLeft borderTop />
    </Cell>
  </Container>
)

const Grid = ({ imageUrls }) => {
  switch (imageUrls.length) {
    case 1:
      return <One imageUrls={imageUrls} />
    case 2:
      return <Two imageUrls={imageUrls} />
    case 3:
      return <Three imageUrls={imageUrls} />
    case 4:
      return <Four imageUrls={imageUrls} />
    case 5:
      return <Five imageUrls={imageUrls} />
    case 6:
      return <Six imageUrls={imageUrls} />
    default:
      return null
  }
}

const Gallery = ({ imageUrls }) => {
  const uniqImageUrls = uniq(imageUrls)

  return (
    <Base>
      <Transform enabled={uniqImageUrls.length >= 2}>
        <Grid imageUrls={uniqImageUrls} />
      </Transform>
    </Base>
  )
}

export default Gallery
