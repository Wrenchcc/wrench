import React, { memo, useCallback } from 'react'
import Animated from 'react-native-reanimated'
import { View } from 'react-native'
import { Text, Icon, ToastNotification } from 'ui'
import { arrowLeft } from 'images'
import { useNavigation } from '../../hooks'
import styles from './styles'

const { interpolate, Extrapolate } = Animated

const OFFSET_INVERTED = -90

function Header({ scrollY, headerTitle, headerRight, headerAnimation = true }) {
  const { navigateBack } = useNavigation()
  const handleNavigation = useCallback(() => navigateBack(), [])

  const opacity = headerAnimation
    ? interpolate(scrollY, {
      inputRange: [OFFSET_INVERTED + 10, OFFSET_INVERTED + 30],
      outputRange: [0, 1],
      extrapolate: Extrapolate.CLAMP,
    })
    : 1

  return (
    <Animated.View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.inner}>
          <View style={styles.left}>
            <Icon onPress={handleNavigation} source={arrowLeft} />
          </View>
          <Animated.View style={{ opacity, flex: 2 }}>
            <Text medium center numberOfLines={1}>
              {headerTitle}
            </Text>
          </Animated.View>
          <View style={styles.right}>{headerRight && headerRight}</View>
        </View>
      </View>
      <ToastNotification />
    </Animated.View>
  )
}

export default memo(Header)
