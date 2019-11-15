// @ts-nocheck
import React from 'react'
import Promo from 'components/Promo'
import { Inner, Base, AppScreens, Stores, Store } from './styles'

function AppPromo({ viewerCountry }) {
  return (
    <Base>
      <Inner direction="row" alignItems="center" justifyContent="space-between">
        <Promo inverted sticky={false} viewerCountry={viewerCountry} />

        <Stores>
          <a rel="nofollow" href="https://apps.apple.com/us/app/id1450213123">
            <Store src={require('./app-store.svg')} />
          </a>
          <a rel="nofollow" href="https://play.google.com/store/apps/details?id=com.wrench">
            <Store src={require('./google-play.svg')} />
          </a>
        </Stores>

        <AppScreens>
          <source
            srcSet={`${require('./phones.jpg?webp')} 1x, ${require('./phones@2x.jpg?webp')} 2x, ${require('./phones@2x.jpg?webp')} 3x`}
            type="image/webp"
          />

          <source
            srcSet={`${require('./phones.jpg')} 1x, ${require('./phones@2x.jpg')} 2x, ${require('./phones@2x.jpg')} 3x`}
            type="image/jpeg"
          />

          <img src={require('./phones.jpg')} />
        </AppScreens>
      </Inner>
    </Base>
  )
}

export default AppPromo
