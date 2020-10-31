// @ts-nocheck
import React from 'react'
import { AppStoreIcon, GooglePlayIcon } from '@wrench/ui'
import Image from 'ui/Image'
import Promo from 'components/Promo'
import { Inner, Base, AppScreens, Stores, Store } from './styles'

function AppPromo({ viewerCountry }) {
  return (
    <Base>
      <Inner direction="row" alignItems="center" justifyContent="space-between">
        <AppScreens>
          <Image
            source="https://edge-files.wrench.cc/static/images/phones-full@3x.png"
            quality="100"
            width="434"
            height="609"
            style={{ width: '100%', height: 'auto' }}
          />
        </AppScreens>

        <Promo inverted sticky={false} viewerCountry={viewerCountry} />

        <Stores>
          <Store>
            <a rel="nofollow" href="https://apps.apple.com/us/app/id1450213123">
              <AppStoreIcon />
            </a>
          </Store>
          <Store>
            <a rel="nofollow" href="https://play.google.com/store/apps/details?id=com.wrench">
              <GooglePlayIcon />
            </a>
          </Store>
        </Stores>
      </Inner>
    </Base>
  )
}

export default AppPromo
