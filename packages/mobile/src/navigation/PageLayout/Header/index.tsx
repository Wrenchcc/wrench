import React, { memo, useCallback } from 'react'
import Animated from 'react-native-reanimated'
import { View } from 'react-native'
import { navigateBack } from 'navigation'
import { Text, Icon } from 'ui'
import { arrowLeft } from 'images'

import styles from './styles'

const { interpolate, Extrapolate } = Animated

const OFFSET_INVERTED = -90

function Header({ scrollY, title, headerRight }) {
  const handleNavigation = useCallback(() => navigateBack(), [])

  const opacity = interpolate(scrollY, {
    inputRange: [OFFSET_INVERTED + 10, OFFSET_INVERTED + 30],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  })

  return (
    <Animated.View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.inner}>
          <View style={styles.left}>
            <Icon onPress={handleNavigation} source={arrowLeft} />
          </View>
          <Animated.View style={{ opacity }}>
            <Text medium center>
              {title}
            </Text>
          </Animated.View>
          <View style={styles.right}>{headerRight && headerRight}</View>
        </View>
      </View>
    </Animated.View>
  )
}

export default memo(Header)
