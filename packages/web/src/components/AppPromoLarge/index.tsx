// @ts-nocheck
import React from 'react'
import Promo from 'components/Promo'
import { Inner, Base, AppScreens, Stores, Store } from './styles'

function AppPromo({ viewerCountry }) {
  return (
    <Base>
      <Inner direction="row" alignItems="center" justifyContent="space-between">
        <AppScreens>
          <source
            srcSet={`${require('./phones.png?webp')} 1x, ${require('./phones@2x.png?webp')} 2x, ${require('./phones@2x.png?webp')} 3x`}
            type="image/webp"
          />
          <source
            srcSet={`${require('./phones.png')} 1x, ${require('./phones@2x.png')} 2x, ${require('./phones@2x.png')} 3x`}
            type="image/jpeg"
          />
          <img src={require('./phones.png')} />
        </AppScreens>

        <Promo inverted sticky={false} viewerCountry={viewerCountry} />

        <Stores>
          <a rel="nofollow" href="https://apps.apple.com/us/app/id1450213123">
            <Store src={require('./app-store.svg')} />
          </a>
          <a rel="nofollow" href="https://play.google.com/store/apps/details?id=com.wrench">
            <Store src={require('./google-play.svg')} />
          </a>
        </Stores>
      </Inner>
    </Base>
  )
}

export default AppPromo
