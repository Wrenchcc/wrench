import React, { Component } from 'react'
import { Image, Platform, ScrollView } from 'react-native'

type ImageOffset = {
  x: number,
  y: number,
}

type ImageSize = {
  width: number,
  height: number,
}

export default class Cropper extends Component {
  contentOffset: ImageOffset

  maximumZoomScale: number

  minimumZoomScale: number

  scaledImageSize: ImageSize

  horizontal: boolean

  componentWillMount() {
    // Scale an image to the minimum size that is large enough to completely
    // fill the crop box.
    const widthRatio = this.props.image.width / this.props.size.width
    const heightRatio = this.props.image.height / this.props.size.height

    this.horizontal = widthRatio > heightRatio

    if (this.horizontal) {
      this.scaledImageSize = {
        width: this.props.image.width / heightRatio,
        height: this.props.size.height,
      }
    } else {
      this.scaledImageSize = {
        width: this.props.size.width,
        height: this.props.image.height / widthRatio,
      }

      // hack to work around Android ScrollView a) not supporting zoom, and
      // b) not supporting vertical scrolling when nested inside another
      // vertical ScrollView (which it is, when displayed inside UIExplorer)
      if (Platform.OS === 'android') {
        this.scaledImageSize.width *= 2
        this.scaledImageSize.height *= 2
        this.horizontal = true
      }
    }

    this.contentOffset = {
      x: (this.scaledImageSize.width - this.props.size.width) / 2,
      y: (this.scaledImageSize.height - this.props.size.height) / 2,
    }

    this.maximumZoomScale = Math.min(
      this.props.image.width / this.scaledImageSize.width,
      this.props.image.height / this.scaledImageSize.height
    )

    this.minimumZoomScale = Math.max(
      this.props.size.width / this.scaledImageSize.width,
      this.props.size.height / this.scaledImageSize.height
    )

    this.updateTransformData(this.contentOffset, this.scaledImageSize, this.props.size)
  }

  onScroll = evt => {
    this.updateTransformData(
      evt.nativeEvent.contentOffset,
      evt.nativeEvent.contentSize,
      evt.nativeEvent.layoutMeasurement
    )
  }

  updateTransformData(offset, scaledImageSize, croppedImageSize) {
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

    if (this.props.onTransformDataChange) {
      this.props.onTransformDataChange(cropData)
    }
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
        style={this.props.style}
        scrollEventThrottle={16}
      >
        <Image source={this.props.image} style={this.scaledImageSize} />
      </ScrollView>
    )
  }
}
