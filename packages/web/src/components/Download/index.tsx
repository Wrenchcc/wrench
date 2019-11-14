import React from 'react'
import AppPromoLarge from 'components/AppPromoLarge'
import Footer from 'components/Footer'
import { Hero } from './styles'

// TODO: Get country
export default function Download() {
  return (
    <>
      <Hero>
        <AppPromoLarge viewerCountry={'SE'} />
      </Hero>
      <Footer />
    </>
  )
}
