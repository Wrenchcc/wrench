import React, { useCallback } from 'react'
import Animated from 'react-native-reanimated'
import { View, SafeAreaView } from 'react-native'
import { Text, Icon } from 'ui'
import Toast from 'components/Toast'
import { arrowLeft } from 'images'
import { useNavigation } from '../../hooks'
import styles from './styles'

const { interpolate, Extrapolate } = Animated

function Header({
  scrollY,
  headerTitle,
  headerLeft,
  headerRight,
  headerSubTitle,
  headerAnimation = true,
  onPress,
}) {
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
      <SafeAreaView>
        <View style={styles.inner}>
          <View style={styles.left}>
            {headerLeft || <Icon onPress={handleNavigation} source={arrowLeft} />}
          </View>
          <Animated.View style={{ opacity, maxWidth: 190 }}>
            <Text medium center numberOfLines={1} onPress={onPress}>
              {headerTitle}
            </Text>
            {headerSubTitle && (
              <Text fontSize={11} numberOfLines={1} color="light_grey" center>
                {headerSubTitle}
              </Text>
            )}
          </Animated.View>
          <View style={styles.right}>{headerRight}</View>
        </View>
      </SafeAreaView>
      <Toast />
    </Animated.View>
  )
}

export default Header
