import React, { useCallback } from 'react'
import { View } from 'react-native'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { Text, Icon } from 'ui'
import { arrowLeft } from 'images'
import PlatformColor from 'ui/PlatformColor'
import { useScrollContext } from '../../scrollables'
import { useNavigation } from '../../hooks'
import { TOP_BAR_HEIGHT, STATUS_BAR_HEIGHT } from '../../constants'

const styles = {
  base: {
    backgroundColor: PlatformColor.default,
    left: 0,
    right: 0,
    top: 0,
    width: '100%',
    zIndex: 10000,
  },
  inner: {
    alignItems: 'center',
    flexDirection: 'row',
    height: TOP_BAR_HEIGHT,
    marginTop: STATUS_BAR_HEIGHT,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerLeft: {
    minWidth: 60,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  headerRight: {
    minWidth: 60,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
}

type HeaderProps = {
  headerTitle: string
  headerLeft?: React.ReactNode
  headerRight: React.ReactNode
  headerSubTitle?: string
  disableAnimation?: boolean
  inline?: boolean
}

function Header({
  headerTitle,
  headerLeft,
  headerRight,
  headerSubTitle,
  disableAnimation = false,
  inline,
}: HeaderProps) {
  const { navigateBack } = useNavigation()
  const handleNavigation = useCallback(() => navigateBack(), [])
  const { scrollY, scrollTo } = useScrollContext()

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: disableAnimation
      ? 1
      : scrollY
      ? interpolate(scrollY.value, [0, 50], [0, 1], Animated.Extrapolate.CLAMP)
      : 1,
  }))

  const handleOnPress = useCallback(() => {
    scrollTo(-1000)
  }, [])

  return (
    <View
      style={[styles.base, { position: inline ? 'relative' : 'absolute' }]}
      pointerEvents="box-none"
    >
      <View style={styles.inner}>
        <View style={styles.headerLeft}>
          {headerLeft || <Icon onPress={handleNavigation} source={arrowLeft} />}
        </View>
        <Animated.View style={[opacityStyle, { flex: 1 }]}>
          <Text medium center numberOfLines={1} onPress={handleOnPress}>
            {headerTitle}
          </Text>
          {headerSubTitle && (
            <Text fontSize={11} numberOfLines={1} color="accent" center>
              {headerSubTitle}
            </Text>
          )}
        </Animated.View>
        <View style={styles.headerRight}>{headerRight}</View>
      </View>
    </View>
  )
}

export default Header
