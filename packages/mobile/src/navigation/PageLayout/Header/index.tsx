import React, { useCallback } from 'react'
import Animated from 'react-native-reanimated'
import { View } from 'react-native'
import { Text, Icon, ToastNotification } from 'ui'
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
        inputRange: [0, 1],
        outputRange: [0, 1],
      })
    : 1

  // const value = interpolate(scrollY, {
  //   inputRange: [OFFSET_INVERTED + 39, OFFSET_INVERTED + 70],
  //   outputRange: [0, 1],
  //   extrapolate: Extrapolate.CLAMP,
  // })
  //
  // const containerStyle = {
  //   opacity: interpolate(value, {
  //     inputRange: [0, 0.8, 1],
  //     outputRange: [0, 0, 1],
  //   }),
  // }

  return (
    <Animated.View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.inner}>
          <View style={styles.left}>
            <Icon onPress={handleNavigation} source={arrowLeft} />
          </View>
          <Animated.View style={{ opacity, width: '60%' }}>
            <Text medium center numberOfLines={1} onPress={onPress}>
              {headerTitle}
            </Text>
          </Animated.View>
          <View style={styles.right}>{headerRight}</View>
        </View>
      </View>
      <ToastNotification />
    </Animated.View>
  )
}

export default Header
