// @ts-nocheck
import React from 'react'
import { AppStoreIcon, GooglePlayIcon } from '@wrench/ui'
import { useTheme } from 'next-themes'
import Promo from 'components/Promo'
// import Image from 'next/image'
import { Icon } from 'ui'
import { Inner, Base, AppScreens, Stores, Store } from './styles'

function AppPromo({ viewerCountry }) {
  const { systemTheme } = useTheme()

  return (
    <Base>
      <Inner direction="row" alignItems="center" justifyContent="space-between">
        <Promo inverted sticky={false} viewerCountry={viewerCountry} inline />

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

        <AppScreens>
          {systemTheme === 'dark' ? (
            <img
              src="/phones-dark@3x.png"
              quality="100"
              width="505"
              height="717"
              style={{ width: '100%', height: 'auto' }}
            />
          ) : (
            <img
              src="/phones@3x.png"
              quality="100"
              width="482"
              height="524"
              style={{ width: '100%', height: 'auto' }}
            />
          )}
        </AppScreens>
      </Inner>
    </Base>
  )
}

export default AppPromo
