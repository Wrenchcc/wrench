import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, InteractionManager } from 'react-native'
import { LongPressGestureHandler, State } from 'react-native-gesture-handler'
import Animated, {
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
} from 'react-native-reanimated'
import { Camera } from 'expo-camera'
import VideoPlayer from 'react-native-video'
import { BlurView } from 'expo-blur'
import { useNavigation } from 'navigation'
import Header from '../Header'
import { CAMERA_SIZE, TAB_BAR_HEIGHT, TIMING_DURATION, MAX_DURATION } from '../constants'
import { formatTime } from '../utils'

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

function Video({ active, animatedValue, setAlert }) {
  const cameraRef = useRef(null)
  const videoRef = useRef(null)
  const opacityCancel = useSharedValue(1)
  const opacityActions = useSharedValue(1)
  const progress = useSharedValue(0)
  const opacity = useSharedValue(0)
  const rotation = useSharedValue(0)
  const deletePosition = useSharedValue(50)
  const tooltip = useSharedValue(0)
  const fadeOpacity = useSharedValue(0)
  const { dismissModal } = useNavigation()

  const [mediaType, setMediaType] = useState(null)
  const [video, setVideo] = useState(null)
  const [picture, setPicture] = useState(null)
  const [shouldDelete, setDelete] = useState(false)
  // const [hasPermission, setHasPermission] = useState(null);
  const [isRecording, setIsRecording] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [type, setType] = useState(Camera.Constants.Type.back)

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestPermissionsAsync();
  //     setHasPermission(status === 'granted');
  //   })();
  // }, []);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (active) {
        cameraRef.current.resumePreview()
        fadeOpacity.value = withTiming(0, {
          duration: TIMING_DURATION,
        })
      } else {
        cameraRef.current.pausePreview()
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

    if ((active && !!video) || (active && !!picture)) {
      opacityActions.value = withTiming(0, {
        duration: TIMING_DURATION,
      })

      animatedValue.value = withTiming(TAB_BAR_HEIGHT, {
        duration: TIMING_DURATION,
      })
    }
  }, [active, video])

  useEffect(() => {
    let interval = null
    if (isRecording) {
      interval = setInterval(() => {
        progress.value = seconds + 1
        setSeconds((seconds) => {
          const duration = seconds + 1

          if (duration === MAX_DURATION) {
            cameraRef.current.stopRecording()
            setIsRecording(false)
          }

          return duration
        })
      }, 1000)
    } else if (!isRecording && seconds !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isRecording, seconds, cameraRef])

  const handleCameraType = useCallback(() => {
    setType(
      type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
    )

    rotation.value = withTiming(type === 1 ? 180 : 0, {
      duration: TIMING_DURATION / 1.5,
    })
  }, [type])

  const showTooltip = () => {
    tooltip.value = withTiming(
      1,
      {
        duration: TIMING_DURATION,
      },
      () =>
        (tooltip.value = withDelay(
          4500,
          withTiming(0, {
            duration: TIMING_DURATION,
          })
        ))
    )
  }

  const handleTakePicture = () => {
    showTooltip()

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
    })
  }

  const handleRecordVideo = useCallback(
    ({ nativeEvent }) => {
      if (nativeEvent.state === State.ACTIVE) {
        tooltip.value = 0
        setMediaType('video')

        opacity.value = withRepeat(
          withTiming(1, {
            duration: 800,
          }),
          0,
          true
        )

        opacityActions.value = withTiming(0, {
          duration: TIMING_DURATION,
        })

        animatedValue.value = withTiming(
          TAB_BAR_HEIGHT,
          {
            duration: TIMING_DURATION / 1.5,
          },
          async () => {
            setIsRecording(true)

            try {
              const video = await cameraRef.current.recordAsync({
                maxDuration: MAX_DURATION,
                quality: '720p',
              })

              setVideo(video)
            } catch (err) {
              // console.log(err);
            }
          }
        )
      }

      if (nativeEvent.state === State.END) {
        setIsRecording(false)

        deletePosition.value = withTiming(
          -70,
          {
            duration: TIMING_DURATION / 1.5,
          },
          () => {
            cameraRef.current.stopRecording()
          }
        )
      }
    },
    [cameraRef]
  )

  const deleteState = () => {
    setDelete(false)
    setMediaType(null)
    setVideo(null)
    setPicture(null)
    setSeconds(0)
    progress.value = 0

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

  const handleOnCancel = () => {
    if (!!video || !!picture) {
      setAlert({
        visible: true,
        type: mediaType,
        onDiscard: deleteState,
      })
    } else {
      // Close
    }
  }

  const width = useDerivedValue(() => {
    return (progress.value * 100) / MAX_DURATION
  })

  const animatedWidthStyle = useAnimatedStyle(() => {
    return {
      width: `${width.value}%`,
    }
  })

  const animatedDotStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    }
  })

  const opacityTooltipStyle = useAnimatedStyle(() => ({
    opacity: tooltip.value,
  }))

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

  return (
    <View style={{ flex: 1 }}>
      <Header
        headerTitle="Camera"
        headerLeft={
          <>
            <Animated.View
              style={[{ bottom: -17, position: 'absolute', zIndex: 999 }, opacityCancelStyle]}
            >
              <TouchableOpacity onPress={handleOnCancel}>
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
            </Animated.View>
          </>
        }
        headerRight={
          <TouchableOpacity onPress={() => alert('Go to post')} disabled={!!video || !!picture}>
            <Text
              style={{
                color: 'white',
                margin: 8,
                fontWeight: '500',
                fontSize: 16,
                opacity: !!video || !!picture ? 1 : 0.5,
              }}
            >
              Next
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
          {mediaType === 'video' && !!video && (
            <VideoPlayer
              ref={videoRef}
              style={{
                backgroundColor: '#222',
                width: CAMERA_SIZE,
                height: CAMERA_SIZE,
              }}
              source={video}
              isMuted
              resizeMode="cover"
              shouldPlay
              isLooping
            />
          )}

          {mediaType === 'picture' && !!picture && (
            <Image
              style={{
                backgroundColor: '#222',
                width: CAMERA_SIZE,
                height: CAMERA_SIZE,
              }}
              source={picture}
            />
          )}

          <Camera
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
          </Camera>

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
              {/* <Animated.Image source={require('../../../assets/flip.png')} style={animatedStyle} /> */}
            </TouchableOpacity>

            <TouchableOpacity>
              {/* <Image source={require('../../../assets/flash.png')} /> */}
            </TouchableOpacity>
          </Animated.View>
        </View>

        <Animated.View style={[{ height: 5, backgroundColor: '#333' }, animatedWidthStyle]} />

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '30%',
          }}
        >
          <View
            style={{
              top: -50,
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            {isRecording && (
              <>
                <Animated.View
                  style={[
                    {
                      width: 5,
                      height: 5,
                      borderRadius: 5,
                      backgroundColor: '#FF0200',
                    },
                    animatedDotStyle,
                  ]}
                />
                <Text style={{ color: 'white', fontWeight: '500', marginLeft: 5 }}>
                  {formatTime(seconds)}
                </Text>
              </>
            )}
          </View>

          <Animated.View
            pointerEvents="none"
            style={[
              {
                backgroundColor: '#222',
                borderRadius: 8,
                padding: 15,
                position: 'absolute',
                top: -70,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              },
              opacityTooltipStyle,
            ]}
          >
            <Text style={{ color: 'white', fontWeight: '500', fontSize: 16 }}>
              Press and hold to record.
            </Text>
            <View
              style={{
                borderLeftWidth: 10,
                borderRightWidth: 10,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                position: 'absolute',
                width: 0,
                height: 0,
                borderStyle: 'solid',
                backgroundColor: 'transparent',
                borderTopWidth: 10,
                borderTopColor: '#222',
                bottom: -10,
              }}
            />
          </Animated.View>

          <TouchableOpacity onPress={handleTakePicture} activeOpacity={0.98} disabled={!!video}>
            <LongPressGestureHandler onHandlerStateChange={handleRecordVideo} minDurationMs={200}>
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
            </LongPressGestureHandler>
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
            Delete
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

export default Video
