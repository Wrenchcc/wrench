import React, { useCallback, useState } from 'react'
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
import { useNavigation, NAVIGATION } from 'navigation'
import { store } from 'gql'
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
  ALBUM_FULLY_DOWN,
  ALBUM_FULLY_UP,
} from '../constants'

const styles = {
  cropArea: {
    position: 'absolute',
    zIndex: 1000,
    width: CROP_AREA,
    height: CROP_AREA + HEADER_HEIGHT + NAVIGATION.STATUS_BAR_HEIGHT,
  },
}

function Library() {
  const cropAreaY = useSharedValue(CROP_FULLY_DOWN)
  const translationY = useSharedValue(0)
  const albumTranslateY = useSharedValue(ALBUM_FULLY_DOWN)
  const isUp = useSharedValue(false)
  const rotation = useSharedValue(0)
  const headerOpacity = useSharedValue(1)

  const { dismissModal } = useNavigation()

  const [showPermission, setShowPermission] = useState(false)

  const handleOnPermission = () => {
    setShowPermission(true)
  }

  const handleOnPermissionAuthorized = () => {
    setShowPermission(false)
  }

  const handleOnSelect = useCallback((item) => {
    const isAdded = store.files.selectedFilesVar().some((file) => file.id === item.id)

    if (isAdded) {
      cropAreaY.value = withTiming(CROP_FULLY_DOWN, {
        duration: TIMING_DURATION,
      })
    }
  }, [])

  const handleToggleAlbum = () => {
    const toggleValue = (isUp.value = !isUp.value)

    rotation.value = withTiming(toggleValue ? 180 : 0, {
      duration: TIMING_DURATION,
    })

    headerOpacity.value = withTiming(toggleValue ? 0 : 1, {
      duration: TIMING_DURATION,
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
      return (
        CROP_AREA -
        DRAG_BAR -
        Math.abs(cropAreaY.value) +
        HEADER_HEIGHT +
        NAVIGATION.STATUS_BAR_HEIGHT
      )
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

  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }))

  if (showPermission) {
    return <Permission onCancel={dismissModal} onSuccess={handleOnPermissionAuthorized} />
  }

  return (
    <>
      <Animated.View style={[styles.cropArea, cropAreaStyle]}>
        <Header
          headerLeftStyle={headerStyle}
          headerRightStyle={headerStyle}
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

      <Albums
        onPress={handleToggleAlbum}
        translateY={albumTranslateY}
        onPermission={handleOnPermission}
      />
    </>
  )
}

export default Library
