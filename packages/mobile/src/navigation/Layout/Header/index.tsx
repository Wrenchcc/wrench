import React from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { Title } from 'ui'
import Toast from 'components/Toast'
import styles from './styles'

function Header({
  headerLeft,
  headerRight,
  headerTitleKey,
  stickyComponent,
  style = {},
  innerStyle = {},
}) {
  const { t } = useTranslation()

  return (
    <Animated.View style={[styles.container, style]}>
      <View style={styles.background}>
        <Animated.View style={[styles.header, innerStyle]}>
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
