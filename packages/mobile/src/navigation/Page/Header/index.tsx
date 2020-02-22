import React, { useCallback } from 'react'
import Animated from 'react-native-reanimated'
import { SafeAreaView } from 'react-native'
import { Text, Icon } from 'ui'
import Toast from 'components/Toast'
import { arrowLeft } from 'images'
import { useNavigation } from '../../hooks'
import { Base, Inner, Left, Right } from './styles'

const { interpolate, Extrapolate } = Animated

function Header({
  scrollY,
  headerTitle,
  headerLeft,
  headerRight,
  headerSubTitle,
  headerAnimation = true,
  onPress,
  inline,
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
    <Base inline={inline}>
      <SafeAreaView>
        <Inner>
          <Left>{headerLeft || <Icon onPress={handleNavigation} source={arrowLeft} />}</Left>
          <Animated.View style={{ opacity, maxWidth: 190 }}>
            <Text medium center numberOfLines={1} onPress={onPress}>
              {headerTitle}
            </Text>
            {headerSubTitle && (
              <Text fontSize={11} numberOfLines={1} color="subtle" center>
                {headerSubTitle}
              </Text>
            )}
          </Animated.View>
          <Right>{headerRight}</Right>
        </Inner>
      </SafeAreaView>
      <Toast />
    </Base>
  )
}

export default Header
