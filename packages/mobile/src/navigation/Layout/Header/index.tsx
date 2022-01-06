import React, { useContext } from 'react'
import Animated from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { ScrollContext } from 'navigation/Layout/context'
import { Title } from 'ui'
import { Base, Background, Content, Inner } from './styles'

const { interpolateNode } = Animated

// NOTE: Used to create translation files
// t('notifications')
// t('home')

function Header({ headerLeft, headerRight, headerTitleKey, stickyComponent }) {
  const { t } = useTranslation('header')

  const { translateY, headerHeight } = useContext(ScrollContext)

  const transform = [
    {
      translateY: interpolateNode(translateY, {
        inputRange: [-headerHeight, 0],
        outputRange: [-headerHeight, 0],
      }),
    },
  ]

  const opacity = interpolateNode(translateY, {
    inputRange: [-headerHeight, 0],
    outputRange: [0, 1],
  })

  return (
    <Base style={{ transform }}>
      <Background>
        <Content style={{ opacity }}>
          <Inner>
            {headerLeft}
            {headerTitleKey && <Title medium>{t(headerTitleKey)}</Title>}
            {headerRight}
          </Inner>
        </Content>
      </Background>

      {stickyComponent}
    </Base>
  )
}

export default React.memo(Header)
