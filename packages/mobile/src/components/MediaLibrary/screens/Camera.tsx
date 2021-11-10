import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, InteractionManager } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions'
import { Camera as EXCamera } from 'expo-camera'
import { BlurView } from 'expo-blur'
import { store } from 'gql'
import { useNavigation, SCREENS } from 'navigation'
import { isIphone } from 'utils/platform'
import AskForPermission from 'components/AskForPermission'
import { flip, flash } from 'images'
import Header from '../Header'
import { CAMERA_SIZE, TAB_BAR_HEIGHT, TIMING_DURATION } from '../constants'

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

const PERMISSION = isIphone ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA

function Camera({ active, animatedValue, setAlert }) {
  const { t } = useTranslation('camera')

  const cameraRef = useRef(null)
  const opacityCancel = useSharedValue(1)
  const opacityActions = useSharedValue(1)
  const rotation = useSharedValue(0)
  const deletePosition = useSharedValue(50)
  const fadeOpacity = useSharedValue(0)

  const [isLoading, setLoading] = useState(true)
  const [permission, setPermission] = useState('')
  const [mediaType, setMediaType] = useState(null)
  const [picture, setPicture] = useState(null)
  const [shouldDelete, setDelete] = useState(false)
  const [type, setType] = useState(EXCamera.Constants.Type.back)

  const { dismissModal, navigate } = useNavigation()

  const navigateToAddPost = useCallback(() => {
    navigate(SCREENS.ADD_POST)
  }, [])

  useEffect(() => {
    check(PERMISSION).then((response) => {
      setLoading(false)
      setPermission(response)
    })
  }, [])

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (active) {
        if (cameraRef.current) {
          cameraRef.current.resumePreview()
        }
        fadeOpacity.value = withTiming(0, {
          duration: TIMING_DURATION,
        })
      } else {
        if (cameraRef.current) {
          cameraRef.current.pausePreview()
        }
        fadeOpacity.value = withTiming(1, {
          duration: TIMING_DURATION,
        })
      }
    })

    // Leaving
    if (!active) {
      animatedValue.value = withTiming(0, {
        duration: TIMING_DURATION,
      })
    }

    if (active && !!picture) {
      opacityActions.value = withTiming(0, {
        duration: TIMING_DURATION,
      })

      animatedValue.value = withTiming(TAB_BAR_HEIGHT, {
        duration: TIMING_DURATION,
      })
    }
  }, [active])

  const handlePermission = useCallback(() => setPermission(RESULTS.GRANTED), [])

  const handleCameraType = useCallback(() => {
    setType(
      type === EXCamera.Constants.Type.back
        ? EXCamera.Constants.Type.front
        : EXCamera.Constants.Type.back
    )

    rotation.value = withTiming(type === 1 ? 180 : 0, {
      duration: TIMING_DURATION / 1.5,
    })
  }, [type])

  const handleTakePicture = () => {
    InteractionManager.runAfterInteractions(async () => {
      const data = await cameraRef.current.takePictureAsync({
        aspect: [4, 4],
      })

      opacityActions.value = withTiming(0, {
        duration: TIMING_DURATION / 1.5,
      })

      animatedValue.value = withTiming(TAB_BAR_HEIGHT, {
        duration: TIMING_DURATION / 1.5,
      })

      deletePosition.value = withTiming(-70, {
        duration: TIMING_DURATION / 1.5,
      })

      setMediaType('picture')
      setPicture(data)

      // Add for add post screen
      store.files.add([data])
    })
  }

  const deleteState = () => {
    setDelete(false)
    setMediaType(null)
    setPicture(null)

    animatedValue.value = withTiming(0, {
      duration: TIMING_DURATION,
    })

    opacityActions.value = withTiming(1, {
      duration: TIMING_DURATION,
    })

    deletePosition.value = withTiming(50, {
      duration: TIMING_DURATION,
    })
  }

  const handleDelete = () => {
    if (shouldDelete) {
      deleteState()
    } else {
      setDelete(true)
    }
  }

  const handleCancel = useCallback(() => {
    store.files.reset()

    if (!!picture) {
      setAlert({
        visible: true,
        type: mediaType,
        onDiscard: deleteState,
      })
    } else {
      dismissModal()
    }
  }, [picture])

  const opacityActionsStyle = useAnimatedStyle(() => ({
    opacity: opacityActions.value,
  }))

  const opacityCancelStyle = useAnimatedStyle(() => ({
    opacity: opacityCancel.value,
  }))

  const deleteStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: deletePosition.value }],
  }))

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    }
  })

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: fadeOpacity.value,
  }))

  if (isLoading) {
    return null
  }

  if (permission !== RESULTS.GRANTED) {
    return (
      <>
        <AskForPermission permission={PERMISSION} onSuccess={handlePermission} type="camera" />

        <Header
          headerLeft={
            <TouchableOpacity onPress={handleCancel}>
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
        />
      </>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Header
        headerTitle={t('camera')}
        headerLeft={
          <>
            <Animated.View
              style={[{ bottom: -17, position: 'absolute', zIndex: 999 }, opacityCancelStyle]}
            >
              <TouchableOpacity onPress={handleCancel}>
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
            </Animated.View>
          </>
        }
        headerRight={
          <TouchableOpacity onPress={navigateToAddPost} disabled={!picture}>
            <Text
              style={{
                color: 'white',
                margin: 8,
                fontWeight: '500',
                fontSize: 16,
                opacity: !!picture ? 1 : 0.5,
              }}
            >
              {t('next')}
            </Text>
          </TouchableOpacity>
        }
      />

      <View
        style={{
          width: CAMERA_SIZE,
          height: CAMERA_SIZE,
        }}
      >
        <View
          style={{
            width: CAMERA_SIZE,
            height: CAMERA_SIZE,
            overflow: 'hidden',
          }}
        >
          {mediaType === 'picture' && !!picture && (
            <Image
              fadeDuration={0}
              style={{
                backgroundColor: '#222',
                width: CAMERA_SIZE,
                height: CAMERA_SIZE,
              }}
              source={picture}
            />
          )}

          <EXCamera
            ref={cameraRef}
            ratio="1:1"
            style={{
              backgroundColor: '#222',
              width: CAMERA_SIZE,
              height: CAMERA_SIZE,
            }}
            type={type}
          >
            <AnimatedBlurView
              intensity={100}
              tint="dark"
              style={[StyleSheet.absoluteFill, , fadeStyle]}
            />
          </EXCamera>

          <Animated.View
            style={[
              {
                position: 'absolute',
                bottom: 20,
                width: '100%',
                paddingHorizontal: 20,
                justifyContent: 'space-between',
                flexDirection: 'row',
              },
              opacityActionsStyle,
            ]}
          >
            <TouchableOpacity onPress={handleCameraType}>
              <Animated.Image source={flip} style={animatedStyle} />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image source={flash} />
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '30%',
          }}
        >
          <TouchableOpacity onPress={handleTakePicture} activeOpacity={0.98}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 90,
                height: 90,
                backgroundColor: '#ccc',
                borderRadius: 90,
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: '#FEFFFF',
                  borderRadius: 60,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
          },
          deleteStyle,
        ]}
      >
        <TouchableOpacity onPress={handleDelete} activeOpacity={0.8}>
          <Text
            style={{
              color: shouldDelete ? '#ED4956' : 'white',
              fontWeight: '500',
              fontSize: 15,
            }}
          >
            {t('delete')}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

export default Camera
