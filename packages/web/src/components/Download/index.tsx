import React from 'react'
import Seo from 'utils/seo'
import AppPromoLarge from 'components/AppPromoLarge'
import Footer from 'components/Footer'
import { Hero } from './styles'

// TODO: Get country
export default function Download() {
  return (
    <>
      <Seo
        config={{
          title: 'Download Apps',
        }}
      />

      <Hero>
        <AppPromoLarge viewerCountry={'SE'} />
      </Hero>
      <Footer />
    </>
  )
}
