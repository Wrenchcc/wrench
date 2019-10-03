import React from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { Title } from 'ui'
import Toast from 'components/Toast'
import styles from './styles'

function Header({ headerLeft, headerRight, headerTitleKey, stickyComponent }) {
  const { t } = useTranslation()

  return (
    <Animated.View style={styles.container}>
      <View style={styles.background}>
        <View style={styles.header}>
          <View style={styles.inner}>
            {headerLeft}
            {headerTitleKey && <Title medium>{t(`Header:${headerTitleKey}`)}</Title>}
            {headerRight}
          </View>
        </View>
      </View>

      <Toast />
      {stickyComponent}
    </Animated.View>
  )
}

export default Header
