/* eslint-disable */
import React from 'react'
import { Base, Container, Cell, Image, Transform, HEIGHT } from './styles'

function One({ images }) {
  return <Image source={images[0].node} height={HEIGHT} />
}

function Two({ images }) {
  return (
    <Container>
      <Cell size={1 / 2}>
        <Image source={images[0].node} height={HEIGHT} borderRight />
      </Cell>
      <Cell size={1 / 2}>
        <Image source={images[1].node} height={HEIGHT} borderLeft />
      </Cell>
    </Container>
  )
}

function Three({ images }) {
  return (
    <Container>
      <Cell size={1 / 2}>
        <Image source={images[0].node} height={HEIGHT} borderRight />
      </Cell>
      <Cell size={1 / 2}>
        <Image source={images[1].node} height={HEIGHT / 2} borderLeft />
        <Image source={images[2].node} height={HEIGHT / 2} borderLeft borderTop />
      </Cell>
    </Container>
  )
}

function Four({ images }) {
  return (
    <Container>
      <Cell size={1 / 2}>
        <Image source={images[0].node} height={HEIGHT / 2} borderRight borderBottom />
        <Image source={images[1].node} height={HEIGHT / 2} borderRight borderTop />
      </Cell>
      <Cell size={1 / 2}>
        <Image source={images[2].node} height={HEIGHT / 2} borderLeft borderBottom />
        <Image source={images[3].node} height={HEIGHT / 2} borderLeft borderTop />
      </Cell>
    </Container>
  )
}

function Five({ images }) {
  return (
    <Container>
      <Cell size={1 / 3}>
        <Image source={images[0].node} height={HEIGHT} borderRight />
      </Cell>
      <Cell size={1 / 3}>
        <Image source={images[1].node} height={HEIGHT / 2} borderRight borderLeft borderBottom />
        <Image source={images[2].node} height={HEIGHT / 2} borderRight borderLeft borderTop />
      </Cell>
      <Cell size={1 / 3}>
        <Image source={images[3].node} height={HEIGHT / 2} borderLeft borderBottom />
        <Image source={images[4].node} height={HEIGHT / 2} borderLeft borderTop />
      </Cell>
    </Container>
  )
}

function Six({ images }) {
  return (
    <Container>
      <Cell size={1 / 3}>
        <Image source={images[0].node} height={HEIGHT / 2} borderRight borderBottom />
        <Image source={images[1].node} height={HEIGHT / 2} borderRight borderTop />
      </Cell>
      <Cell size={1 / 3}>
        <Image source={images[2].node} height={HEIGHT / 2} borderRight borderLeft borderBottom />
        <Image source={images[3].node} height={HEIGHT / 2} borderRight borderLeft borderTop />
      </Cell>
      <Cell size={1 / 3}>
        <Image source={images[4].node} height={HEIGHT / 2} borderLeft borderBottom />
        <Image source={images[5].node} height={HEIGHT / 2} borderLeft borderTop />
      </Cell>
    </Container>
  )
}

function Grid({ images }) {
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

export default function Gallery({ images }) {
  return (
    <Base>
      <Transform enabled={images.length >= 2}>
        <Grid images={images} />
      </Transform>
    </Base>
  )
}
