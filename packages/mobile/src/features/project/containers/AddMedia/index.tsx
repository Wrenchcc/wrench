import React, { useCallback, useState, useMemo } from 'react'
import { ActivityIndicator, View, Dimensions, TouchableOpacity, Image } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { usePostStore } from 'store'
import { useNavigation, SCREENS } from 'navigation'
import { Header, Text, Icon, Touchable } from 'ui'
import cropImage from 'utils/cropImage'
import { close } from 'images'
import { logError } from 'utils/sentry'
import Camera from 'components/Camera'
import ImageEditor from 'components/ImageEditor'
import MediaPicker from 'components/MediaPicker'
import SelectProject from '../../components/SelectProject'
import { Base } from './styles'
import Animated from 'react-native-reanimated'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import { clamp, withSpring, onScroll, timing } from 'react-native-redash'

const {
  Value,
  debug,
  event,
  block,
  add,
  useCode,
  multiply,
  cond,
  lessOrEq,
  set,
  not,
  and,
  neq,
  interpolate,
  Clock,
  clockRunning,
} = Animated

const { width, height } = Dimensions.get('window')

const SCREEN_HEIGHT = height
const CROP_AREA = width
const DRAG_BAR_HEIGHT = 70 // NOTE: Depending if has notch
const FULLY_UP = CROP_AREA + DRAG_BAR_HEIGHT
const SNAP_TOP = CROP_AREA - DRAG_BAR_HEIGHT
const TIMING_DURATION = 150

const magic = {
  damping: 50,
  mass: 0.3,
  stiffness: 121.6,
  overshootClamping: true,
  restSpeedThreshold: 0.3,
  restDisplacementThreshold: 0.3,
  deceleration: 0.999,
  bouncyFactor: 1,
  velocityFactor: 1, //P(1, 0.8),
  toss: 0.4,
  coefForTranslatingVelocities: 5,
}

function AddMedia() {
  const {
    cropAreaPositionY,
    clock,
    cropArea,
    dragY,
    fullScrollHeight,
    shouldMnuallyGoDown,
    newScreenHeight,
    opacity,
    scrollAreaPosition,
    scrollAreaPositionTop,
    scrollAreaPositionTop2,
    scrollHeight,
    scrollY,
    snapPoints,
    state,
    translationY,
    velocityY,
    isUp,
    offset,
  } = useMemo(
    () => ({
      cropAreaPositionY: new Value(0),
      clock: new Clock(),
      cropArea: new Value(CROP_AREA),
      dragY: new Value(0),
      fullScrollHeight: new Value(SCREEN_HEIGHT - DRAG_BAR_HEIGHT),
      shouldMnuallyGoDown: new Value(0),
      newScreenHeight: new Value(SCREEN_HEIGHT - CROP_AREA),
      opacity: new Value(1),
      scrollAreaPosition: new Value(CROP_AREA),
      scrollAreaPositionTop: new Value(DRAG_BAR_HEIGHT),
      scrollAreaPositionTop2: new Value(CROP_AREA),
      scrollHeight: new Value(SCREEN_HEIGHT - CROP_AREA),
      scrollY: new Value(0),
      snapPoints: [new Value(-SNAP_TOP), new Value(0)],
      state: new Value(State.UNDETERMINED),
      translationY: new Value(0),
      velocityY: new Value(0),
      isUp: new Value(0),
      offset: new Value(0),
    }),
    []
  )

  const { t } = useTranslation()
  const { navigate, dismissModal } = useNavigation()
  const [isLoading, setLoading] = useState(false)
  const { showActionSheetWithOptions } = useActionSheet()

  const {
    onSelect,
    onEdit,
    selectedFile,
    hasSelectedFiles,
    selectedFiles,
    addFiles,
    reset,
  } = usePostStore(store => ({
    addFiles: store.actions.addFiles,
    hasSelectedFiles: store.selectedFiles.length > 0,
    onEdit: store.actions.onEdit,
    onSelect: store.actions.onSelect,
    reset: store.actions.reset,
    selectedFile: store.selectedFiles.find(({ id }) => id === store.selectedId),
    selectedFiles: store.selectedFiles,
  }))

  const handleCropping = useCallback(async () => {
    setLoading(true)

    try {
      const files = await Promise.all(selectedFiles.map(cropImage))
      addFiles(files)
    } catch (err) {
      logError(err)
    }

    setLoading(false)

    navigate(SCREENS.ADD_POST)
  }, [selectedFile, navigate, addFiles])

  const handleDismissModal = useCallback(() => {
    if (hasSelectedFiles) {
      showActionSheetWithOptions(
        {
          title: t('AddMedia:options:title'),
          options: [t('AddMedia:options:discard'), t('AddMedia:options:cancel')],
          destructiveButtonIndex: 0,
          cancelButtonIndex: 1,
          tintColor: 'black',
        },
        index => {
          if (index === 0) {
            dismissModal()
            reset()
          }
        }
      )
    } else {
      dismissModal()
    }
  }, [hasSelectedFiles, showActionSheetWithOptions, dismissModal, reset])

  const onGestureEvent = event([
    {
      nativeEvent: {
        velocityY: velocityY,
        state: state,
        translationY: translationY,
        dragY: dragY,
      },
    },
  ])

  useCode(
    () =>
      block([
        cond(neq(cropAreaPositionY, 0), [set(isUp, 1)], set(isUp, 0)),

        cond(
          and(shouldMnuallyGoDown, isUp),
          [
            set(
              cropAreaPositionY,
              timing({
                clock,
                duration: TIMING_DURATION,
                from: -SNAP_TOP,
                to: 0,
              })
            ),
            cond(not(clockRunning(clock)), [
              set(shouldMnuallyGoDown, 0),
              set(isUp, 0),
              set(offset, 0),
            ]),
          ],
          [
            set(
              cropAreaPositionY,
              clamp(
                withSpring({
                  offset,
                  value: translationY,
                  velocity: velocityY,
                  state: state,
                  snapPoints: snapPoints,
                  dragY: dragY,
                  config: magic,
                }),
                -FULLY_UP,
                0
              )
            ),
          ]
        ),

        set(
          newScreenHeight,
          cond(
            lessOrEq(scrollY, cropArea),
            add(multiply(-1, cropAreaPositionY), scrollHeight),
            fullScrollHeight
          )
        ),

        set(
          scrollAreaPositionTop2,
          cond(
            lessOrEq(scrollY, cropArea),
            add(scrollAreaPosition, cropAreaPositionY),
            scrollAreaPositionTop
          )
        ),

        set(
          opacity,
          interpolate(cropAreaPositionY, {
            inputRange: [-FULLY_UP, 0],
            outputRange: [0, 1],
          })
        ),
      ]),
    []
  )

  return (
    <Base>
      <Animated.View
        style={{
          position: 'absolute',
          zIndex: 1,
          width: CROP_AREA,
          height: CROP_AREA,
          overflow: 'hidden',
          backgroundColor: 'rgb(34,34,34)',
          transform: [
            {
              translateY: cropAreaPositionY,
            },
          ],
        }}
      >
        <Animated.View style={{ opacity, flex: 1 }}>
          {/* <Header
            headerLeft={<Icon source={close} onPress={handleDismissModal} nativeHandler />}
            headerRight={
              isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : hasSelectedFiles ? (
                <Touchable onPress={handleCropping} nativeHandler>
                  <Text color="white" medium>
                    {t('AddMedia:next')}
                  </Text>
                </Touchable>
              ) : null
            }
            color="black"
          /> */}

          {/* <SelectProject /> */}

          {selectedFile ? (
            <ImageEditor source={selectedFile} onChange={onEdit} />
          ) : (
            <Camera onTakePicture={onSelect} />
          )}
        </Animated.View>
        <Animated.View
          pointerEvents="box-none"
          style={{
            width: '100%',
            height: DRAG_BAR_HEIGHT,
            position: 'absolute',
            bottom: 0,
          }}
        >
          <PanGestureHandler onHandlerStateChange={onGestureEvent} {...{ onGestureEvent }}>
            <Animated.View style={{ flex: 1 }}></Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </Animated.View>

      <Animated.View
        style={{
          height: newScreenHeight,
          transform: [
            {
              translateY: scrollAreaPositionTop2,
            },
          ],
        }}
      >
        <MediaPicker
          onScroll={onScroll({ y: scrollY })}
          showCropper={() => shouldMnuallyGoDown.setValue(1)}
        />
      </Animated.View>
    </Base>
  )
}

export default AddMedia
