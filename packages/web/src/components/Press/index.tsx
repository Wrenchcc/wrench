// @ts-nocheck
import React from 'react'
import Seo from 'utils/seo'
import { Title, Text } from 'ui'
import Footer from 'components/Footer'
import { Inner, Row, Image } from './styles'

function Press() {
  return (
    <>
      <Seo
        config={{
          title: 'Press',
        }}
      />

      <Inner>
        <Title medium>Press</Title>
        <Text color="neutral">Here you can find our most common requested press assets.</Text>
      </Inner>

      <Footer />
    </>
  )
}

export default Press
