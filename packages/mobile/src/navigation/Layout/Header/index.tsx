import React from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedStyle, interpolate } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { Title } from 'ui'
import PlatformColor from 'ui/PlatformColor'
import { useScrollContext } from 'navigation'
import { STATUS_BAR_HEIGHT, TOP_BAR_HEIGHT } from '../../constants'

// NOTE: Used to create translation files
// t('notifications')
// t('home')

const styles = {
  container: {
    left: 0,
    right: 0,
    top: 0,
    width: '100%',
    zIndex: 10000,
    position: 'absolute',
  },
  backgrond: {
    zIndex: 10000,
    backgroundColor: PlatformColor.default,
  },
  content: {
    backgroundColor: PlatformColor.default,
    marginTop: STATUS_BAR_HEIGHT,
  },
  inner: {
    alignItems: 'center',
    flexDirection: 'row',
    height: TOP_BAR_HEIGHT,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
}

function Header({ headerLeft, headerRight, headerTitleKey, stickyComponent }) {
  const { t } = useTranslation('header')
  const { headerY } = useScrollContext()

  const transformStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          headerY.value,
          [0, TOP_BAR_HEIGHT],
          [0, -TOP_BAR_HEIGHT],
          Animated.Extrapolate.CLAMP
        ),
      },
    ],
  }))

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      headerY.value,
      [TOP_BAR_HEIGHT / 1.5, 0],
      [0, 1],
      Animated.Extrapolate.CLAMP
    ),
  }))

  return (
    <Animated.View style={[styles.container, transformStyle]} pointerEvents="box-none">
      <View style={styles.backgrond}>
        <Animated.View style={[styles.content, opacityStyle]}>
          <View style={styles.inner}>
            {headerLeft}
            {headerTitleKey && <Title medium>{t(headerTitleKey)}</Title>}
            {headerRight}
          </View>
        </Animated.View>
      </View>
      {stickyComponent}
    </Animated.View>
  )
}

export default Header
