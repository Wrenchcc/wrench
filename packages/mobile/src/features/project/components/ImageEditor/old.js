import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Platform,
} from 'react-native'
import { COLORS } from 'ui/constants'
import GridLayout from '../GridLayout'

const { width } = Dimensions.get('window')

const IMAGE_EDITOR_HEIGHT = width
const IMAGE_EDITOR_WIDTH = width

export default class ImageEditor extends PureComponent {
  state = {
    isMoving: false,
    isLoading: true,
  }

  static propTypes = {
    image: PropTypes.object.isRequired,
    onEditImage: PropTypes.func.isRequired,
  }

  contentOffset = {}

  horizontal = false

  maximumZoomScale = 0

  minimumZoomScale = null

  scaledImageSize = null

  componentDidMount() {
    if (!this.props.image) return
    this.setImageProperties(this.props.image)
  }

  componentDidUpdate(prevProps) {
    if (this.props.image.uri !== prevProps.image.uri) {
      this.handleLoading(true)
      this.setImageProperties(this.props.image)
    }
  }

  setImageProperties(image) {
    const widthRatio = image.width / IMAGE_EDITOR_WIDTH
    const heightRatio = image.height / IMAGE_EDITOR_HEIGHT

    this.horizontal = widthRatio > heightRatio

    if (this.horizontal) {
      this.scaledImageSize = {
        width: image.width / heightRatio,
        height: IMAGE_EDITOR_HEIGHT,
      }
    } else {
      this.scaledImageSize = {
        width: IMAGE_EDITOR_WIDTH,
        height: image.height / widthRatio,
      }
      if (Platform.OS === 'android') {
        this.scaledImageSize.width *= 2
        this.scaledImageSize.height *= 2
        this.horizontal = true
      }
    }

    this.contentOffset = {
      x: (this.scaledImageSize.width - IMAGE_EDITOR_WIDTH) / 2,
      y: (this.scaledImageSize.height - IMAGE_EDITOR_HEIGHT) / 2,
    }

    this.maximumZoomScale = Math.min(
      image.width / this.scaledImageSize.width,
      image.height / this.scaledImageSize.height
    )

    this.minimumZoomScale = Math.max(
      IMAGE_EDITOR_WIDTH / this.scaledImageSize.width,
      IMAGE_EDITOR_HEIGHT / this.scaledImageSize.height
    )

    this.handleOnEditImage(this.contentOffset, this.scaledImageSize, {
      width: IMAGE_EDITOR_WIDTH,
      height: IMAGE_EDITOR_HEIGHT,
    })
  }

  handleLoading = isLoading => {
    this.setState({ isLoading })
  }

  onScroll = evt => {
    this.handleOnEditImage(
      evt.nativeEvent.contentOffset,
      evt.nativeEvent.contentSize,
      evt.nativeEvent.layoutMeasurement,
      evt.nativeEvent.zoomScale
    )
  }

  setIsMoving = isMoving => {
    this.setState({ isMoving })
  }

  handleOnEditImage(offset, scaledImageSize, croppedImageSize) {
    const offsetRatioX = offset.x / scaledImageSize.width
    const offsetRatioY = offset.y / scaledImageSize.height
    const sizeRatioX = croppedImageSize.width / scaledImageSize.width
    const sizeRatioY = croppedImageSize.height / scaledImageSize.height

    this.props.onEditImage({
      offset: {
        x: this.props.image.width * offsetRatioX,
        y: this.props.image.height * offsetRatioY,
      },
      size: {
        width: this.props.image.width * sizeRatioX,
        height: this.props.image.height * sizeRatioY,
      },
    })
  }

  render() {
    const { isMoving, isLoading } = this.state

    return (
      <View key={this.props.image.uri}>
        <ScrollView
          alwaysBounceVertical
          automaticallyAdjustContentInsets={false}
          contentOffset={this.contentOffset}
          decelerationRate="fast"
          horizontal={this.horizontal}
          maximumZoomScale={this.maximumZoomScale}
          minimumZoomScale={this.minimumZoomScale}
          onMomentumScrollEnd={this.onScroll}
          onScrollEndDrag={() => this.setIsMoving(false)}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          <TouchableWithoutFeedback onPressIn={() => this.setIsMoving(true)}>
            <Image
              style={[{ backgroundColor: COLORS.DARK_GREY }, this.scaledImageSize]}
              source={this.props.image}
              blurRadius={isLoading ? 20 : 0}
              onLoadEnd={() => this.handleLoading(false)}
            />
          </TouchableWithoutFeedback>
        </ScrollView>

        <GridLayout active={isMoving} />
      </View>
    )
  }
}
