import React from 'react'
import Seo from 'utils/seo'
import AppPromoLarge from 'components/AppPromoLarge'
import Footer from 'components/Footer'
import { Hero } from './styles'

export default function Download({ viewerCountry }) {
  return (
    <>
      <Seo
        config={{
          title: 'Download Apps',
        }}
      />

      <Hero>
        <AppPromoLarge viewerCountry={viewerCountry} />
      </Hero>
      <Footer />
    </>
  )
}
