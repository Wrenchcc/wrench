import React, { useContext } from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { ScrollContext } from 'navigation/Layout/context'
import { Title } from 'ui'
import Toast from 'components/Toast'
import styles from './styles'

const { interpolate } = Animated

function Header({ headerLeft, headerRight, headerTitleKey, stickyComponent, style = {} }) {
  const { translateY, headerHeight } = useContext(ScrollContext)
  const { t } = useTranslation()

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        {
          transform: [
            {
              translateY: interpolate(translateY, {
                inputRange: [-headerHeight, 0],
                outputRange: [-headerHeight, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.background}>
        <Animated.View
          style={[
            styles.header,
            {
              opacity: interpolate(translateY, {
                inputRange: [-headerHeight, 0],
                outputRange: [0, 1],
              }),
            },
          ]}
        >
          <View style={styles.inner}>
            {headerLeft}
            {headerTitleKey && <Title medium>{t(`Header:${headerTitleKey}`)}</Title>}
            {headerRight}
          </View>
        </Animated.View>
      </View>

      <Toast />
      {stickyComponent}
    </Animated.View>
  )
}

export default Header
