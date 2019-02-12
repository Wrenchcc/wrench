/* eslint-disable */
import React, { memo } from 'react'
import { Base, Container, Cell, Image, Transform, HEIGHT } from './styles'

const One = memo(function One({ files }) {
  return <Image source={files[0].node} height={HEIGHT} />
})

const Two = memo(function Two({ files }) {
  return (
    <Container>
      <Cell size={1 / 2}>
        <Image source={files[0].node} height={HEIGHT} borderRight />
      </Cell>
      <Cell size={1 / 2}>
        <Image source={files[1].node} height={HEIGHT} borderLeft />
      </Cell>
    </Container>
  )
})

const Three = memo(function Three({ files }) {
  return (
    <Container>
      <Cell size={1 / 2}>
        <Image source={files[0].node} height={HEIGHT} borderRight />
      </Cell>
      <Cell size={1 / 2}>
        <Image source={files[1].node} height={HEIGHT / 2} borderLeft />
        <Image source={files[2].node} height={HEIGHT / 2} borderLeft borderTop />
      </Cell>
    </Container>
  )
})

const Four = memo(function Four({ files }) {
  return (
    <Container>
      <Cell size={1 / 2}>
        <Image source={files[0].node} height={HEIGHT / 2} borderRight borderBottom />
        <Image source={files[1].node} height={HEIGHT / 2} borderRight borderTop />
      </Cell>
      <Cell size={1 / 2}>
        <Image source={files[2].node} height={HEIGHT / 2} borderLeft borderBottom />
        <Image source={files[3].node} height={HEIGHT / 2} borderLeft borderTop />
      </Cell>
    </Container>
  )
})

const Five = memo(function Five({ files }) {
  return (
    <Container>
      <Cell size={1 / 3}>
        <Image source={files[0].node} height={HEIGHT} borderRight />
      </Cell>
      <Cell size={1 / 3}>
        <Image source={files[1].node} height={HEIGHT / 2} borderRight borderLeft borderBottom />
        <Image source={files[2].node} height={HEIGHT / 2} borderRight borderLeft borderTop />
      </Cell>
      <Cell size={1 / 3}>
        <Image source={files[3].node} height={HEIGHT / 2} borderLeft borderBottom />
        <Image source={files[4].node} height={HEIGHT / 2} borderLeft borderTop />
      </Cell>
    </Container>
  )
})

const Six = memo(function Six({ files }) {
  return (
    <Container>
      <Cell size={1 / 3}>
        <Image source={files[0].node} height={HEIGHT / 2} borderRight borderBottom />
        <Image source={files[1].node} height={HEIGHT / 2} borderRight borderTop />
      </Cell>
      <Cell size={1 / 3}>
        <Image source={files[2].node} height={HEIGHT / 2} borderRight borderLeft borderBottom />
        <Image source={files[3].node} height={HEIGHT / 2} borderRight borderLeft borderTop />
      </Cell>
      <Cell size={1 / 3}>
        <Image source={files[4].node} height={HEIGHT / 2} borderLeft borderBottom />
        <Image source={files[5].node} height={HEIGHT / 2} borderLeft borderTop />
      </Cell>
    </Container>
  )
})

const Grid = memo(function Grid({ files }) {
  switch (files.length) {
    case 1:
      return <One files={files} />
    case 2:
      return <Two files={files} />
    case 3:
      return <Three files={files} />
    case 4:
      return <Four files={files} />
    case 5:
      return <Five files={files} />
    case 6:
      return <Six files={files} />
    default:
      return null
  }
})

export default function Gallery({ files }) {
  return (
    <Base>
      <Transform enabled={files.length >= 2}>
        <Grid files={files} />
      </Transform>
    </Base>
  )
}
