import React, { PureComponent } from 'react'
import { Animated, Dimensions } from 'react-native'
import { PanGestureHandler, State, PinchGestureHandler } from 'react-native-gesture-handler'
import { COLORS } from 'ui/constants'

const { width } = Dimensions.get('window')

const IMAGE_EDITOR_HEIGHT = width
const IMAGE_EDITOR_WIDTH = width
const SCALE_MULTIPLIER = 1.2

export default class ImageEditor extends PureComponent {
  scaledImageSize = null

  gesturePosition = new Animated.ValueXY()

  gestureOffset = new Animated.ValueXY()

  scaleValue = new Animated.Value(1)

  panRef = React.createRef()

  lastOffset = { x: 0, y: 0 }

  constructor(props) {
    super(props)
    this.setImageProperties(props.image)
  }

  onPanGestureStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      this.lastOffset.x += nativeEvent.translationX
      this.lastOffset.y += nativeEvent.translationY
      this.gesturePosition.setValue({ x: 0, y: 0 })
      this.gestureOffset.setValue({ x: this.lastOffset.x, y: this.lastOffset.y })

      const maxOffsetX = -Math.abs(this.scaledImageSize.width - IMAGE_EDITOR_WIDTH)
      if (maxOffsetX > this.lastOffset.x) {
        this.lastOffset.x = maxOffsetX
        Animated.spring(this.gestureOffset.x, {
          bounciness: 3,
          toValue: maxOffsetX,
          useNativeDriver: true,
        }).start()
      }

      if (this.lastOffset.x > 0) {
        this.lastOffset.x = 0

        Animated.spring(this.gestureOffset.x, {
          bounciness: 3,
          toValue: 0,
          useNativeDriver: true,
        }).start()
      }

      const maxOffsetY = -Math.abs(this.scaledImageSize.height - IMAGE_EDITOR_HEIGHT)
      if (maxOffsetY > this.lastOffset.y) {
        this.lastOffset.y = maxOffsetY
        Animated.spring(this.gestureOffset.y, {
          bounciness: 3,
          toValue: maxOffsetY,
          useNativeDriver: true,
        }).start()
      }

      if (this.lastOffset.y > 0) {
        this.lastOffset.y = 0
        Animated.spring(this.gestureOffset.y, {
          bounciness: 3,
          toValue: 0,
          useNativeDriver: true,
        }).start()
      }
    }
  }

  onPanGestureEvent = ({ nativeEvent }) => {
    const { translationX, translationY } = nativeEvent

    this.gesturePosition.setValue({
      x: translationX,
      y: translationY,
    })
  }

  onGesturePinch = ({ nativeEvent }) => {
    // this.scaleValue.setValue(nativeEvent.scale)
  }

  setImageProperties(image) {
    const widthRatio = image.width / IMAGE_EDITOR_WIDTH
    const heightRatio = image.height / IMAGE_EDITOR_HEIGHT
    const horizontal = widthRatio > heightRatio

    if (horizontal) {
      this.scaledImageSize = {
        width: image.width / heightRatio,
        height: IMAGE_EDITOR_HEIGHT,
      }
    } else {
      this.scaledImageSize = {
        width: IMAGE_EDITOR_WIDTH,
        height: image.height / widthRatio,
      }
    }

    // this.contentOffset = {
    //   x: (this.scaledImageSize.width - IMAGE_EDITOR_WIDTH) / 2,
    //   y: (this.scaledImageSize.height - IMAGE_EDITOR_HEIGHT) / 2,
    // }

    this.maximumZoomScale = Math.min(
      image.width / this.scaledImageSize.width,
      image.height / this.scaledImageSize.height
    )

    this.minimumZoomScale = Math.max(
      IMAGE_EDITOR_WIDTH / this.scaledImageSize.width,
      IMAGE_EDITOR_HEIGHT / this.scaledImageSize.height
    )
  }

  render() {
    // const scale = this.scaleValue.interpolate({
    //   inputRange: [this.minimumZoomScale, this.maximumZoomScale],
    //   outputRange: [this.minimumZoomScale * SCALE_MULTIPLIER, this.maximumZoomScale],
    //   extrapolate: 'clamp',
    // })

    const transform = [
      { translateX: Animated.add(this.gesturePosition.x, this.gestureOffset.x) },
      { translateY: Animated.add(this.gesturePosition.y, this.gestureOffset.y) },
      // { scale },
    ]

    return (
      <PanGestureHandler
        onGestureEvent={this.onPanGestureEvent}
        onHandlerStateChange={this.onPanGestureStateChange}
        ref={this.panRef}
        minPointers={0}
        maxPointers={2}
        minDist={0}
        minDeltaX={0}
        avgTouches
      >
        <Animated.View>
          <PinchGestureHandler
            simultaneousHandlers={this.panRef}
            onGestureEvent={this.onGesturePinch}
          >
            <Animated.Image
              style={[
                {
                  backgroundColor: COLORS.DARK_GREY,
                  transform,
                },
                this.scaledImageSize,
              ]}
              source={this.props.image}
            />
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    )
  }
}
