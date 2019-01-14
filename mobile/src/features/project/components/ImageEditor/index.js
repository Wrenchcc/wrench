import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Dimensions } from 'react-native'
import { PanGestureHandler, State, PinchGestureHandler } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { COLORS } from 'ui/constants'
import { friction, bouncyPinch, bouncy, dragDiff } from './helpers'

const { set, cond, eq, or, sub, max, multiply, divide, lessThan, Value, event, add } = Animated

const { width } = Dimensions.get('window')

const IMAGE_EDITOR_WIDTH = width
const IMAGE_EDITOR_HEIGHT = width

// https://github.com/facebook/react-native/blob/bd32234e6ec0006ede180d09b464f1277737e789/RNTester/js/ImageEditingExample.js
export default class ImageEditor extends PureComponent {
  static propTypes = {
    image: PropTypes.object.isRequired,
    // onEditImage: PropTypes.func.isRequired,
  }

  pinchRef = React.createRef()

  panRef = React.createRef()

  constructor(props) {
    super(props)

    this.setImageProperties(props.image)

    // DECLARE TRANSX
    const panTransX = new Value(0)
    const panTransY = new Value(0)

    // PINCH
    const pinchScale = new Value(1)
    const pinchFocalX = new Value(0)
    const pinchFocalY = new Value(0)
    const pinchState = new Value(-1)

    this.onPinchEvent = event([
      {
        nativeEvent: {
          state: pinchState,
          scale: pinchScale,
          focalX: pinchFocalX,
          focalY: pinchFocalY,
        },
      },
    ])

    // SCALE
    const scale = new Value(1)
    const pinchActive = eq(pinchState, State.ACTIVE)

    this.focalDisplacementX = new Value(0)
    const relativeFocalX = sub(pinchFocalX, add(panTransX, this.focalDisplacementX))

    this.focalDisplacementY = new Value(0)
    const relativeFocalY = sub(pinchFocalY, add(panTransY, this.focalDisplacementY))

    this.scale = set(
      scale,
      bouncyPinch(
        scale,
        pinchScale,
        pinchActive,
        relativeFocalX,
        this.focalDisplacementX,
        relativeFocalY,
        this.focalDisplacementY
      )
    )

    // PAN
    const dragX = new Value(0)
    const dragY = new Value(0)
    const panState = new Value(-1)

    this.onPanEvent = event([
      {
        nativeEvent: {
          translationX: dragX,
          translationY: dragY,
          state: panState,
        },
      },
    ])

    const panActive = eq(panState, State.ACTIVE)
    const panFriction = value => friction(value)

    // X
    const panUpX = cond(lessThan(this.scale, 1), 0, multiply(-1, this.focalDisplacementX))
    const panLowX = add(panUpX, multiply(-this.scaledImageSize.width, add(max(1, this.scale), -1)))

    this.panTransX = set(
      panTransX,
      bouncy(
        panTransX,
        dragDiff(dragX, panActive),
        or(panActive, pinchActive),
        panLowX,
        panUpX,
        panFriction
      )
    )

    // Y
    const panUpY = cond(lessThan(this.scale, 1), 0, multiply(-1, this.focalDisplacementY))
    const panLowY = add(panUpY, multiply(-this.scaledImageSize.height, add(max(1, this.scale), -1)))

    this.panTransY = set(
      panTransY,
      bouncy(
        panTransY,
        dragDiff(dragY, panActive),
        or(panActive, pinchActive),
        panLowY,
        panUpY,
        panFriction
      )
    )
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
  }

  // handleOnEditImage(offset, scaledImageSize, croppedImageSize) {
  //   const offsetRatioX = offset.x / scaledImageSize.width
  //   const offsetRatioY = offset.y / scaledImageSize.height
  //   const sizeRatioX = croppedImageSize.width / scaledImageSize.width
  //   const sizeRatioY = croppedImageSize.height / scaledImageSize.height
  //
  //   this.props.onEditImage({
  //     offset: {
  //       x: this.props.image.width * offsetRatioX,
  //       y: this.props.image.height * offsetRatioY,
  //     },
  //     size: {
  //       width: this.props.image.width * sizeRatioX,
  //       height: this.props.image.height * sizeRatioY,
  //     },
  //   })
  // }

  render() {
    // The below two animated values makes it so that scale appears to be done
    // from the top left corner of the image view instead of its center. This
    // is required for the "scale focal point" math to work correctly
    const scaleTopLeftFixX = divide(multiply(this.scaledImageSize.width, add(this.scale, -1)), 2)
    const scaleTopLeftFixY = divide(multiply(this.scaledImageSize.height, add(this.scale, -1)), 2)

    return (
      <PinchGestureHandler
        ref={this.pinchRef}
        simultaneousHandlers={this.panRef}
        onGestureEvent={this.onPinchEvent}
        onHandlerStateChange={this.onPinchEvent}
      >
        <Animated.View>
          <PanGestureHandler
            ref={this.panRef}
            avgTouches
            simultaneousHandlers={this.pinchRef}
            onGestureEvent={this.onPanEvent}
            onHandlerStateChange={this.onPanEvent}
          >
            <Animated.Image
              style={[
                {
                  backgroundColor: COLORS.DARK_GREY,
                  transform: [
                    { translateX: this.panTransX },
                    { translateY: this.panTransY },
                    { translateX: this.focalDisplacementX },
                    { translateY: this.focalDisplacementY },
                    { translateX: scaleTopLeftFixX },
                    { translateY: scaleTopLeftFixY },
                    { scale: this.scale },
                  ],
                },
                this.scaledImageSize,
              ]}
              source={this.props.image}
            />
          </PanGestureHandler>
        </Animated.View>
      </PinchGestureHandler>
    )
  }
}
