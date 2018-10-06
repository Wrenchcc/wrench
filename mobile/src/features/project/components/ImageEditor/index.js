import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, Image, Platform } from 'react-native'

export default class ImageEditor extends PureComponent {
  static propTypes = {
    image: PropTypes.object.isRequired,
    onCropping: PropTypes.func.isRequired,
    size: PropTypes.object.isRequired,
  }

  contentOffset = {}

  horizontal = false

  maximumZoomScale = 0

  minimumZoomScale = null

  scaledImageSize = null

  constructor(props) {
    super(props)

    if (!props.image) return

    const widthRatio = props.image.width / props.size.width
    const heightRatio = props.image.height / props.size.height

    this.horizontal = widthRatio > heightRatio

    if (this.horizontal) {
      this.scaledImageSize = {
        width: props.image.width / heightRatio,
        height: props.size.height,
      }
    } else {
      this.scaledImageSize = {
        width: props.size.width,
        height: props.image.height / widthRatio,
      }
      if (Platform.OS === 'android') {
        // hack to work around Android ScrollView a) not supporting zoom, and
        // b) not supporting vertical scrolling when nested inside another
        // vertical ScrollView (which it is, when displayed inside UIExplorer)
        this.scaledImageSize.width *= 2
        this.scaledImageSize.height *= 2
        this.horizontal = true
      }
    }

    this.contentOffset = {
      x: (this.scaledImageSize.width - props.size.width) / 2,
      y: (this.scaledImageSize.height - props.size.height) / 2,
    }

    this.maximumZoomScale = Math.min(
      props.image.width / this.scaledImageSize.width,
      props.image.height / this.scaledImageSize.height
    )

    this.minimumZoomScale = Math.max(
      props.size.width / this.scaledImageSize.width,
      props.size.height / this.scaledImageSize.height
    )

    this.updateCroppingData(this.contentOffset, this.scaledImageSize, props.size)
  }

  onScroll = evt => {
    this.updateCroppingData(
      evt.nativeEvent.contentOffset,
      evt.nativeEvent.contentSize,
      evt.nativeEvent.layoutMeasurement
    )
  }

  updateCroppingData(offset, scaledImageSize, croppedImageSize) {
    const offsetRatioX = offset.x / scaledImageSize.width
    const offsetRatioY = offset.y / scaledImageSize.height
    const sizeRatioX = croppedImageSize.width / scaledImageSize.width
    const sizeRatioY = croppedImageSize.height / scaledImageSize.height

    const cropData = {
      offset: {
        x: this.props.image.width * offsetRatioX,
        y: this.props.image.height * offsetRatioY,
      },
      size: {
        width: this.props.image.width * sizeRatioX,
        height: this.props.image.height * sizeRatioY,
      },
    }

    this.props.onCropping(cropData)
  }

  render() {
    return (
      <ScrollView
        alwaysBounceVertical
        automaticallyAdjustContentInsets={false}
        contentOffset={this.contentOffset}
        decelerationRate="fast"
        horizontal={this.horizontal}
        maximumZoomScale={this.maximumZoomScale}
        minimumZoomScale={this.minimumZoomScale}
        onMomentumScrollEnd={this.onScroll}
        onScrollEndDrag={this.onScroll}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <Image style={this.scaledImageSize} source={this.props.image} />
      </ScrollView>
    )
  }
}
