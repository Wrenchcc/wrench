import React, { useRef } from 'react'
import { Dimensions } from 'react-native'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import Camera from '../components/Camera'
import AddPostHeader from '../components/AddPostHeader'
import ImageEditor from '../components/ImageEditor'
import MediaPicker from '../components/MediaPicker'

const { width } = Dimensions.get('window')

const {
  divide,
  call,
  onChange,
  block,
  and,
  Extrapolate,
  Value,
  Clock,
  cond,
  eq,
  set,
  add,
  sub,
  multiply,
  lessThan,
  clockRunning,
  startClock,
  spring,
  stopClock,
  event,
  interpolate,
  timing,
  neq,
} = Animated

const SIZE = width

// function runSpring(clock, value, dest) {
//   const state = {
//     finished: new Value(0),
//     velocity: new Value(0),
//     position: new Value(0),
//     time: new Value(0),
//   }
//
//   const config = {
//     mass: 0.3,
//     stiffness: 121.6,
//     overshootClamping: true,
//     restSpeedThreshold: 0.3,
//     restDisplacementThreshold: 0.3,
//     toValue: new Value(0),
//   }
//
//   return [
//     cond(clockRunning(clock), 0, [
//       set(state.finished, 0),
//       set(state.velocity, 0),
//       set(state.position, value),
//       set(config.toValue, dest),
//       startClock(clock),
//     ]),
//     spring(clock, state, config),
//     cond(state.finished, stopClock(clock)),
//     state.position,
//   ]
// }

function AddMedia() {
  const translationY = useRef(new Value(0))
  // const velocityY = useRef(new Value(0))
  // const state = useRef(new Value(State.UNDETERMINED))

  const { selected, files } = useStoreState(state => state.post)
  const { addFile, editFile, selectFile } = useStoreActions(actions => actions.post)

  const handleOnGestureEvent = event(
    [
      {
        nativeEvent: {
          translationY: translationY.current,
          // velocityY: velocityY.current,
          // state: state.current,
        },
      },
    ],
    {
      useNativeDriver: true,
    }
  )

  // const finalTranslateY = add(add(translationY, offsetY), multiply(0.2, velocityY))
  // const snapPoint = cond(
  //   lessThan(finalTranslateY, divide(this.currentSceneHeight, 2)),
  //   0,
  //   screenHeight
  // )
  //
  // this.translateY = block([
  //   cond(
  //     eq(state, State.END),
  //     set(
  //       offsetY,
  //       set(translationY, runSpring(this.clockY, add(translationY, offsetY), snapPoint))
  //     ),
  //     [
  //       cond(eq(state, State.BEGAN), [
  //         stopClock(this.clockY),
  //         cond(neq(offsetY2, 0), [set(offsetY, 0), set(offsetY2, 0)]),
  //       ]),
  //       add(offsetY, translationY),
  //     ]
  //   ),
  // ])

  return (
    <Animated.View
      style={{
        width: SIZE,
        height: SIZE,
        transform: [{ translateY: translationY }],
        // transform: [
        //   {
        //     translateY: sub(screenHeight, sub(currentSceneHeightAnimation, tY)),
        //   },
        // ],
      }}
    >
      {selected ? (
        <ImageEditor image={selected} onEditImage={editFile} uri={selected.uri} />
      ) : (
        <Camera onTakePicture={addFile} />
      )}

      <PanGestureHandler onGestureEvent={handleOnGestureEvent}>
        <Animated.View
          style={{
            backgroundColor: 'white',
            height: 50,
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
          }}
        />
      </PanGestureHandler>

      <MediaPicker onSelect={selectFile} files={files} selected={selected} />
    </Animated.View>
  )
}

export default AddMedia
