import React, { useCallback, useMemo, useRef } from 'react'
import { View } from 'react-native'
import BottomSheet, { BottomSheetBackdropProps, useBottomSheet } from '@gorhom/bottom-sheet'
import { TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated'
import { useNavigation } from 'navigation'
import { Text } from 'ui'
import Background from './Background'
import PlatformColor from 'ui/PlatformColor'

const styles = {
  base: {
    backgroundColor: PlatformColor.default,
  },
  bar: {
    alignSelf: 'center',
    height: 4,
    width: 60,
    backgroundColor: PlatformColor.divider,
  },
  row: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: PlatformColor.divider,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'black',
  },
}

const Backdrop = ({ animatedIndex }: BottomSheetBackdropProps) => {
  const ref = useRef()
  const { close } = useBottomSheet()

  const handleClose = useCallback(() => {
    // NOTE: Hack to get the underlaying view to react to touches
    ref?.current?.setNativeProps({ pointerEvents: 'none' })
    close()
  }, [ref])

  const gestureHandler = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
    {
      onFinish: () => {
        runOnJS(handleClose)()
      },
    },
    [handleClose]
  )

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [-1, -1, 0], [0, 0, 0.5], Extrapolate.CLAMP),
    flex: 1,
  }))

  return (
    <TapGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[containerAnimatedStyle, styles.container]} ref={ref} />
    </TapGestureHandler>
  )
}

const HalfPanel = ({ renderContent = () => null, data, height }) => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const { dismissHalfpanel } = useNavigation()

  const snapPoints = useMemo(() => [height], [height])

  const handleOnChange = useCallback((index) => {
    if (index === -1) {
      dismissHalfpanel()
    }
  }, [])

  const renderBackdrop = useCallback((props) => <Backdrop {...props} />, [])

  const RenderDataContent = () => (
    <View style={styles.base}>
      {data.map(({ title, onPress }) => {
        const handleOnPress = () => {
          bottomSheetRef?.current.close()
          requestAnimationFrame(() => {
            onPress()
            dismissHalfpanel()
          })
        }

        return (
          <View key={title} style={styles.row}>
            <Text onPress={handleOnPress} fontSize={17}>
              {title}
            </Text>
          </View>
        )
      })}
    </View>
  )

  return (
    <BottomSheet
      handleComponent={null}
      onChange={handleOnChange}
      backgroundComponent={Background}
      backdropComponent={renderBackdrop}
      ref={bottomSheetRef}
      enablePanDownToClose
      animateOnMount
      index={0}
      snapPoints={snapPoints}
    >
      <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
        <View style={styles.bar} />
        {data ? <RenderDataContent /> : renderContent()}
      </View>
    </BottomSheet>
  )
}

export default HalfPanel
