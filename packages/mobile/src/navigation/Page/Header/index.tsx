import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { Text, Icon } from 'ui'
import { arrowLeft } from 'images'
import { useNavigation } from '../../hooks'
import { Base, Inner } from './styles'

const { interpolateNode, Extrapolate } = Animated

type HeaderProps = {
  scrollY: Animated.Adaptable<number>
  headerTitle: string
  headerLeft?: React.ReactNode
  headerRight: React.ReactNode
  headerSubTitle?: string
  headerAnimation?: boolean
  onPress: () => void
  inline?: boolean
}

function Header({
  scrollY,
  headerTitle,
  headerLeft,
  headerRight,
  headerSubTitle,
  headerAnimation = true,
  onPress,
  inline,
}: HeaderProps) {
  const { navigateBack } = useNavigation()
  const handleNavigation = useCallback(() => navigateBack(), [])

  const opacity =
    scrollY && headerAnimation
      ? interpolateNode(scrollY, {
          extrapolate: Extrapolate.CLAMP,
          inputRange: [0, 50],
          outputRange: [0, 1],
        })
      : 1

  return (
    <Base inline={inline}>
      <Inner>
        <View>{headerLeft || <Icon onPress={handleNavigation} source={arrowLeft} />}</View>
        <Animated.View style={{ opacity, maxWidth: 230 }}>
          <Text medium center numberOfLines={1} onPress={onPress}>
            {headerTitle}
          </Text>
          {headerSubTitle && (
            <Text fontSize={11} numberOfLines={1} color="accent" center>
              {headerSubTitle}
            </Text>
          )}
        </Animated.View>
        <View>{headerRight}</View>
      </Inner>
    </Base>
  )
}

export default Header
