import React, { useCallback } from 'react'
import Animated from 'react-native-reanimated'
import { View } from 'react-native'
import { Text, Icon, Toast } from 'ui'
import { arrowLeft } from 'images'
import { useNavigation } from '../../hooks'
import styles from './styles'

const { interpolate, Extrapolate } = Animated

function Header({ scrollY, headerTitle, headerRight, headerAnimation = true, onPress }) {
  const { navigateBack } = useNavigation()
  const handleNavigation = useCallback(() => navigateBack(), [])

  const opacity = headerAnimation
    ? interpolate(scrollY, {
        extrapolate: Extrapolate.CLAMP,
        inputRange: [0, 50],
        outputRange: [0, 1],
      })
    : 1

  return (
    <Animated.View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.inner}>
          <View style={styles.left}>
            <Icon onPress={handleNavigation} source={arrowLeft} />
          </View>
          <Animated.View style={{ opacity, width: '42%' }}>
            <Text medium center numberOfLines={1} onPress={onPress}>
              {headerTitle}
            </Text>
          </Animated.View>
          <View style={styles.right}>{headerRight}</View>
        </View>
      </View>
      <Toast />
    </Animated.View>
  )
}

export default Header
