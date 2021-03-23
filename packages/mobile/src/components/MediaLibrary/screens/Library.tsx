import React, { useState, useCallback, useEffect } from 'react'
import { ActivityIndicator, View, TouchableOpacity, Text } from 'react-native'
import Animated, {
  useSharedValue,
  useDerivedValue,
  interpolate,
  withTiming,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
} from 'react-native-reanimated'
import { PanGestureHandler, FlatList } from 'react-native-gesture-handler'
import { clamp, snapPoint } from 'react-native-redash'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import * as MediaLibrary from 'expo-media-library'
import { useNavigation, SCREENS } from 'navigation'
import AskForPermission from 'components/AskForPermission'
import { isIphone, isAndroid } from 'utils/platform'
import Item, { MARGIN, ITEM_SIZE } from '../Item'
import Header from '../Header'
import ImageEditor from '../ImageEditor'
import Albums from '../Albums'
import {
  HEADER_HEIGHT,
  CROP_FULLY_DOWN,
  INITIAL_PAGE_SIZE,
  PAGE_SIZE,
  CROP_FULLY_UP,
  TIMING_DURATION,
  CROP_AREA,
  DRAG_BAR,
  TAB_BAR_HEIGHT,
  ALBUM_FULLY_DOWN,
  ALBUM_FULLY_UP,
} from '../constants'

const PERMISSION = isIphone
  ? PERMISSIONS.IOS.PHOTO_LIBRARY
  : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE

const WRITE_EXTERNAL_STORAGE_PERMISSION = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

function Library({ active, animatedValue }) {
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
  const [isPaused, setPaused] = useState(false)
  const [selectedFile, selectFile] = useState([])
  const [assets, setAssets] = useState([])
  const [hasNextPage, setHasNextPage] = useState(true)
  const [endCursor, setEndCursor] = useState()
  const [lastEndCursor, setLastEndCursor] = useState()

  const { dismissModal, navigate } = useNavigation()

  const navigateToAddPost = useCallback(() => {
    navigate(SCREENS.ADD_POST, {
      options: {
        topBar: {
          visible: false,
        },
      },
    })
  }, [])

  useEffect(() => {
    check(PERMISSION).then((res) => {
      setLoading(false)
      setPhotoPermission(res)
      setCheckingPermission(false)
    })

    // NOTE: For saving image
    if (isAndroid) {
      check(WRITE_EXTERNAL_STORAGE_PERMISSION).then((res) => {
        // NOTE: Need to ask for permission here
        if (res !== RESULTS.GRANTED) {
          request(WRITE_EXTERNAL_STORAGE_PERMISSION)
        }
      })
    }

    fetchInitialAssets()
  }, [])

  useEffect(() => {}, [active, isPaused])

  const permissionAuthorized = useCallback(() => {
    setPhotoPermission(RESULTS.GRANTED)
  }, [setPhotoPermission])

  const fetchInitialAssets = useCallback(async (album) => {
    try {
      const result = await MediaLibrary.getAssetsAsync({
        first: INITIAL_PAGE_SIZE,
        album: album?.id || null,
        mediaType: [MediaLibrary.MediaType.photo],
        sortBy: MediaLibrary.SortBy.creationTime,
      })

      selectFile(result.assets[0])

      setAssets(result.assets)
      setHasNextPage(result.hasNextPage)
      setEndCursor(result.endCursor)
    } catch {}
  }, [])

  const fetchMoreAssets = useCallback(
    async (after) => {
      if (!hasNextPage) {
        return
      }

      // NOTE: Dirty fix for fetching same data
      setLastEndCursor(after)

      try {
        const result = await MediaLibrary.getAssetsAsync({
          after,
          album: selectedAlbum.id,
          first: PAGE_SIZE,
          sortBy: [[MediaLibrary.SortBy.creationTime, false]],
        })

        // NOTE: Dirty fix for fetching same data
        if (after !== lastEndCursor) {
          setAssets((p) => p.concat(result.assets))
        }

        setHasNextPage(result.hasNextPage)
        setEndCursor(result.endCursor)
      } catch (err) {
        // logError(err)
      }
    },
    [hasNextPage, setAssets, setHasNextPage, setEndCursor, lastEndCursor, selectedAlbum]
  )

  const handleChangeAlbum = (album) => {
    handleToggleAlbum()
    setSelectedAlbum(album)
    fetchInitialAssets(album)
  }

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

  const onEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchMoreAssets(endCursor)
    }
  }, [hasNextPage, endCursor, fetchMoreAssets])

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

  const handleOnselect = (item) => {
    selectFile(item)
    setPaused(false)

    cropAreaY.value = withTiming(CROP_FULLY_DOWN, {
      duration: TIMING_DURATION,
    })
  }

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

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  const spacingStyle = useAnimatedStyle(() => ({
    height: spacing.value,
  }))

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

  const renderFooter = useCallback(() => {
    if (hasNextPage && assets.length) {
      return (
        <View style={{ paddingTop: 30, paddingBottom: 30 }}>
          <ActivityIndicator color="white" />
        </View>
      )
    }

    return null
  }, [hasNextPage, assets])

  if (checkingPermission || isLoading) {
    return null
  }

  if (photoPermission !== RESULTS.GRANTED) {
    return (
      <>
        <AskForPermission permission={PERMISSION} onSuccess={permissionAuthorized} type="photo" />

        <Header
          headerLeft={
            <TouchableOpacity onPress={dismissModal}>
              <Text
                style={{
                  color: 'white',
                  margin: 8,
                  fontWeight: '500',
                  fontSize: 16,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          }
        />
      </>
    )
  }

  return (
    <>
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              zIndex: 1000,
              width: CROP_AREA,
              height: CROP_AREA + HEADER_HEIGHT,
              backgroundColor: '#222',
            },
            cropAreaStyle,
          ]}
        >
          <Header
            headerLeftStyle={headerLeftStyle}
            headerRightStyle={headerRightStyle}
            arrowStyle={arrowStyle}
            selectedAlbum={selectedAlbum}
            toggleAlbum={handleToggleAlbum}
            headerLeft={
              <TouchableOpacity onPress={dismissModal}>
                <Text
                  style={{
                    color: 'white',
                    margin: 8,
                    fontWeight: '500',
                    fontSize: 16,
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            }
            headerRight={
              <TouchableOpacity onPress={navigateToAddPost} disabled={!selectedFile}>
                <Text
                  style={{
                    color: 'white',
                    margin: 8,
                    fontWeight: '500',
                    fontSize: 16,
                    opacity: !selectedFile ? 0.5 : 1,
                  }}
                >
                  Next
                </Text>
              </TouchableOpacity>
            }
            animatedValue={animatedValue}
          />

          <ImageEditor source={selectedFile} />

          <Animated.View
            pointerEvents="none"
            style={[
              {
                position: 'absolute',
                zIndex: 1,
                top: HEADER_HEIGHT,
                width: CROP_AREA,
                height: CROP_AREA,
                backgroundColor: '#000',
              },
              opacityStyle,
            ]}
          />

          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View
              style={{
                position: 'absolute',
                bottom: 0,
                zIndex: 100,
                width: '100%',
                height: DRAG_BAR,
              }}
            />
          </PanGestureHandler>
        </Animated.View>

        <Animated.View style={{ flex: 1, marginTop: DRAG_BAR, marginBottom: TAB_BAR_HEIGHT }}>
          <AnimatedFlatList
            ListHeaderComponent={<Animated.View style={[{ width: '100%' }, spacingStyle]} />}
            onScroll={scrollHandler}
            scrollEventThrottle={1}
            automaticallyAdjustContentInsets={false}
            numColumns={4}
            windowSize={17}
            ListFooterComponent={renderFooter}
            data={assets}
            keyExtractor={(item) => item.id}
            initialNumToRender={PAGE_SIZE}
            style={{ marginLeft: -MARGIN }}
            getItemLayout={(_, index) => ({
              length: ITEM_SIZE,
              offset: ITEM_SIZE * index,
              index,
            })}
            renderItem={({ item }) => (
              <Item onPress={handleOnselect} item={item} selected={selectedFile.id === item.id} />
            )}
            onEndReached={onEndReached}
          />
        </Animated.View>
      </View>

      <Albums
        onPress={handleChangeAlbum}
        setInitialAlbum={setSelectedAlbum}
        translateY={albumTranslateY}
      />
    </>
  )
}

export default Library
