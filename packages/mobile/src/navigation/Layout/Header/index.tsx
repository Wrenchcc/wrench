import React, { useContext } from 'react'
import Animated from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { ScrollContext } from 'navigation/Layout/context'
import { Title } from 'ui'
import Toast from 'components/Toast'
import { Base, Background, Content, Inner } from './styles'

const { interpolate } = Animated

function Header({ headerLeft, headerRight, headerTitleKey, stickyComponent }) {
  const { translateY, headerHeight } = useContext(ScrollContext)
  const { t } = useTranslation()

  const transform = [
    {
      translateY: interpolate(translateY, {
        inputRange: [-headerHeight, 0],
        outputRange: [-headerHeight, 0],
      }),
    },
  ]

  const opacity = interpolate(translateY, {
    inputRange: [-headerHeight, 0],
    outputRange: [0, 1],
  })

  return (
    <Base style={{ transform }}>
      <Background>
        <Content style={{ opacity }}>
          <Inner>
            {headerLeft}
            {headerTitleKey && <Title medium>{t(`Header:${headerTitleKey}`)}</Title>}
            {headerRight}
          </Inner>
        </Content>
      </Background>

      <Toast />
      {stickyComponent}
    </Base>
  )
}

export default Header
