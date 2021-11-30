import React, { useState, useCallback, useEffect } from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import { useReactiveVar } from '@apollo/client'
import { store } from 'gql'
import { useTranslation } from 'react-i18next'
import Animated, {
  useSharedValue,
  useDerivedValue,
  interpolate,
  withTiming,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
} from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { clamp, snapPoint } from 'react-native-redash'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import { useNavigation, SCREENS } from 'navigation'
import AskForPermission from 'components/AskForPermission'
import { isIphone, isAndroid } from 'utils/platform'
import cropImage from 'utils/cropImage'
import Header from '../Header'
import ImageEditor from '../ImageEditor'
import Albums from '../Albums'
import Dragbar from '../Dragbar'
import Opacity from '../Opacity'
import MediaSelector from '../MediaSelector'
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
  const { t } = useTranslation('library')

  const cropAreaY = useSharedValue(CROP_FULLY_DOWN)
  const translationY = useSharedValue(0)
  const albumTranslateY = useSharedValue(ALBUM_FULLY_DOWN)
  const isUp = useSharedValue(false)
  const rotation = useSharedValue(0)
  const headerOpacity = useSharedValue(1)

  const [isLoading, setLoading] = useState(true)
  const [checkingPermission, setCheckingPermission] = useState(true)
  const [photoPermission, setPhotoPermission] = useState('')
  const [selectedAlbum, setSelectedAlbum] = useState(null)

  const { dismissModal, navigate } = useNavigation()

  const selectedFiles = useReactiveVar(store.files.selectedFilesVar)
  const selectedFileId = useReactiveVar(store.files.selectedFileIdVar)
  const selectedFile = selectedFiles.find(({ id }) => id === selectedFileId)

  const handleOnCancel = useCallback(() => {
    store.files.reset()
    dismissModal()
  }, [])

  // const handleCropping = useCallback(async () => {
  //   try {
  //     setCropping(true)
  //     const files = await Promise.all(selectedFiles.map(cropImage))
  //     store.files.add(files)
  //   } catch (err) {
  //     // logError(err)
  //   }

  //   navigate(SCREENS.ADD_POST)

  //   setCropping(false)
  // }, [navigate])

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

  // if (checkingPermission || isLoading) {
  //   return null
  // }

  // if (photoPermission !== RESULTS.GRANTED) {
  //   // return <Permission />
  // }

  return (
    <>
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Animated.View style={[styles.cropArea, cropAreaStyle]}>
          <Header
            headerLeftStyle={headerLeftStyle}
            headerRightStyle={headerRightStyle}
            arrowStyle={arrowStyle}
            // selectedAlbum={selectedAlbum}
            toggleAlbum={handleToggleAlbum}
            headerLeft={
              <TouchableOpacity onPress={handleOnCancel}>
                <Text
                  style={{
                    color: 'white',
                    margin: 8,
                    fontWeight: '500',
                    fontSize: 16,
                  }}
                >
                  {t('cancel')}
                </Text>
              </TouchableOpacity>
            }
            // headerRight={
            //   <TouchableOpacity onPress={handleCropping} disabled={!selectedFiles.length}>
            //     {isCropping ? (
            //       <ActivityIndicator color="white" />
            //     ) : (
            //       <Text
            //         style={{
            //           color: 'white',
            //           margin: 8,
            //           fontWeight: '500',
            //           fontSize: 16,
            //           opacity: !selectedFiles.length ? 0.5 : 1,
            //         }}
            //       >
            //         {t('next')}
            //       </Text>
            //     )}
            //   </TouchableOpacity>
            // }
          />

          {selectedFile && <ImageEditor source={selectedFile} onChange={store.files.edit} />}

          <Opacity opacity={opacity} />
          <Dragbar gestureHandler={gestureHandler} />
        </Animated.View>

        <MediaSelector onScroll={scrollHandler} spacing={spacing} album={selectedAlbum} />
      </View>

      {/* <Albums
        onPress={handleChangeAlbum}
        setInitialAlbum={setSelectedAlbum}
        translateY={albumTranslateY}
      /> */}
    </>
  )
}

export default Library
