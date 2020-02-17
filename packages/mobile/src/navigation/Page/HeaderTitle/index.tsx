import React, { memo } from 'react'
import Animated from 'react-native-reanimated'
import { Text } from 'ui'

const { interpolate, Extrapolate } = Animated

function HeaderTitle({
  text,
  subtitle,
  scrollY,
  onPress,
  headerTitleFontSize,
  headerAnimation = true,
}) {
  const opacity = headerAnimation
    ? interpolate(scrollY, {
        extrapolate: Extrapolate.CLAMP,
        inputRange: [0, 50],
        outputRange: [0, 1],
      })
    : 1

  // NOTE: Fixed width may not be the best way.
  return (
    <Animated.View style={{ opacity, maxWidth: 190 }}>
      <Text medium center numberOfLines={1} onPress={onPress} fontSize={headerTitleFontSize}>
        {text}
      </Text>
      {subtitle && (
        <Text fontSize={11} numberOfLines={1} color="light_grey" center>
          {subtitle}
        </Text>
      )}
    </Animated.View>
  )
}

export default memo(HeaderTitle)
