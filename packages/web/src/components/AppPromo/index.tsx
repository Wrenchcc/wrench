// @ts-nocheck
import React from 'react'
import { useTheme } from 'next-themes'
import Promo from 'components/Promo'
import Image from 'next/image'
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
              {/* <div dangerouslySetInnerHTML={{ __html: require('./app-store.svg?include') }} /> */}
            </a>
          </Store>
          <Store>
            <a rel="nofollow" href="https://play.google.com/store/apps/details?id=com.wrench">
              {/* <div dangerouslySetInnerHTML={{ __html: require('./google-play.svg?include') }} /> */}
            </a>
          </Store>
        </Stores>

        <AppScreens>
          {systemTheme === 'dark' ? (
            <Image src="/phones-dark@3x.png" quality="100" width="505" height="717" />
          ) : (
            <Image src="/phones@3x.png" quality="100" width="482" height="524" />
          )}
        </AppScreens>
      </Inner>
    </Base>
  )
}

export default AppPromo
