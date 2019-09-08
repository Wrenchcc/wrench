import React, { useContext } from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { Title } from 'ui'
import Toast from 'components/Toast'
import { ListContext } from '../context'
import { transformContainer, opacityContent } from './animation'
import styles from './styles'

function Header({ headerLeft, headerRight, headerTitleKey, stickyComponent }) {
  const { translateY, headerHeight } = useContext(ListContext)
  const { t } = useTranslation()

  return (
    <Animated.View style={[styles.container, transformContainer(translateY, headerHeight)]}>
      <View style={styles.background}>
        <View style={styles.header}>
          <Animated.View style={opacityContent(translateY, headerHeight)}>
            <View style={styles.inner}>
              {headerLeft}
              {headerTitleKey && <Title medium>{t(`Header:${headerTitleKey}`)}</Title>}
              {headerRight}
            </View>
          </Animated.View>
        </View>
      </View>

      <Toast />
      {stickyComponent}
    </Animated.View>
  )
}

export default Header
