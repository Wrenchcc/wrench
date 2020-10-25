// @ts-nocheck
import React from 'react'
import {useTheme } from 'next-themes'
import Promo from 'components/Promo'
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
              <div dangerouslySetInnerHTML={{__html: require('./app-store.svg')}} />
            </a>
          </Store>          
          <Store>
            <a rel="nofollow" href="https://play.google.com/store/apps/details?id=com.wrench">
              <div dangerouslySetInnerHTML={{__html: require('./google-play.svg')}} />
            </a>
          </Store>
        </Stores>

        <AppScreens>
          {systemTheme === 'dark' ? <>
          <source
              srcSet={`${require('./phones-dark.png?webp')} 1x, ${require('./phones-dark@2x.png?webp')} 2x, ${require('./phones-dark@2x.png?webp')} 3x`}
              type="image/webp"
            />

            <source
              srcSet={`${require('./phones-dark.png')} 1x, ${require('./phones-dark@2x.png')} 2x, ${require('./phones-dark@3x.png')} 3x`}
              type="image/jpeg"
            />

            <img src={require('./phones-dark.png')} />
          </> : 
          <> 
            <source
              srcSet={`${require('./phones.png?webp')} 1x, ${require('./phones@2x.png?webp')} 2x, ${require('./phones@2x.png?webp')} 3x`}
              type="image/webp"
            />

            <source
              srcSet={`${require('./phones.png')} 1x, ${require('./phones@2x.png')} 2x, ${require('./phones@3x.png')} 3x`}
              type="image/jpeg"
            />

            <img src={require('./phones.png')} />
          </>}
         
        </AppScreens>
      </Inner>
    </Base>
  )
}

export default AppPromo
