import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import Animated, {
  useSharedValue,
  useDerivedValue,
  interpolate,
  withTiming,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
} from 'react-native-reanimated'
import { clamp, snapPoint } from 'react-native-redash'
import { useNavigation } from 'navigation'
import Header from '../Header'
import ImageEditor from '../ImageEditor'
import Albums from '../Albums'
import Dragbar from '../Dragbar'
import Opacity from '../Opacity'
import MediaSelector from '../MediaSelector'
import Permission from '../Permission'
import {
  HEADER_HEIGHT,
  CROP_FULLY_DOWN,
  CROP_FULLY_UP,
  TIMING_DURATION,
  CROP_AREA,
  DRAG_BAR,
  TAB_BAR_HEIGHT,
  ALBUM_FULLY_DOWN,
  ALBUM_FULLY_UP,
} from '../constants'

const styles = {
  cropArea: {
    position: 'absolute',
    zIndex: 1000,
    width: CROP_AREA,
    height: CROP_AREA + HEADER_HEIGHT,
    backgroundColor: '#222',
  },
}

function Library({ animatedValue }) {
  const cropAreaY = useSharedValue(CROP_FULLY_DOWN)
  const translationY = useSharedValue(0)
  const albumTranslateY = useSharedValue(ALBUM_FULLY_DOWN)
  const isUp = useSharedValue(false)
  const rotation = useSharedValue(0)
  const headerOpacity = useSharedValue(1)

  const { dismissModal } = useNavigation()

  const [askForPermission, setPermission] = useState(false)

  const handleOnPermission = () => {
    setPermission(true)
  }

  const handleOnSelect = useCallback(() => {
    cropAreaY.value = withTiming(CROP_FULLY_DOWN, {
      duration: TIMING_DURATION,
    })
  }, [])

  const handleToggleAlbum = () => {
    const toggleValue = (isUp.value = !isUp.value)

    rotation.value = withTiming(toggleValue ? 180 : 0, {
      duration: TIMING_DURATION,
    })

    headerOpacity.value = withTiming(toggleValue ? 0 : 1, {
      duration: TIMING_DURATION,
    })

    animatedValue.value = withTiming(toggleValue ? TAB_BAR_HEIGHT : 0, {
      duration: TIMING_DURATION / 1.5,
    })

    albumTranslateY.value = withTiming(toggleValue ? ALBUM_FULLY_UP : ALBUM_FULLY_DOWN, {
      duration: TIMING_DURATION,
    })
  }

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y
  })

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = cropAreaY.value
    },
    onActive: (event, ctx) => {
      cropAreaY.value = clamp(ctx.startY + event.translationY, CROP_FULLY_UP, CROP_FULLY_DOWN)
    },
    onEnd: (event) => {
      cropAreaY.value = withTiming(
        snapPoint(cropAreaY.value * 1.7, event.velocityX, [CROP_FULLY_UP, CROP_FULLY_DOWN]),
        {
          duration: TIMING_DURATION,
        }
      )
    },
  })

  const opacity = useDerivedValue(() => {
    return interpolate(cropAreaY.value, [CROP_FULLY_DOWN, CROP_FULLY_UP], [0, 0.5])
  })

  const spacing = useDerivedValue(() => {
    if (Math.abs(CROP_FULLY_UP) > translationY.value) {
      return CROP_AREA - DRAG_BAR - Math.abs(cropAreaY.value) + HEADER_HEIGHT
    }
  })

  const cropAreaStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: cropAreaY.value,
        },
      ],
    }
  })

  const arrowStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    }
  })

  const headerLeftStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }))

  const headerRightStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }))

  if (askForPermission) {
    return <Permission onCancel={dismissModal} onSuccess={handleOnPermission} />
  }

  return (
    <>
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Animated.View style={[styles.cropArea, cropAreaStyle]}>
          <Header
            headerLeftStyle={headerLeftStyle}
            headerRightStyle={headerRightStyle}
            arrowStyle={arrowStyle}
            toggleAlbum={handleToggleAlbum}
          />

          <ImageEditor />

          <Opacity opacity={opacity} />
          <Dragbar gestureHandler={gestureHandler} />
        </Animated.View>

        <MediaSelector
          onScroll={scrollHandler}
          spacing={spacing}
          onSelect={handleOnSelect}
          onPermission={handleOnPermission}
        />
      </View>

      <Albums onPress={handleToggleAlbum} translateY={albumTranslateY} />
    </>
  )
}

export default Library
