import React, { Component } from 'react'
import { Image, ScrollView } from 'react-native'

export default class ImageEditor extends Component {
  contentOffset: {}

  horizontal: boolean

  maximumZoomScale: number

  minimumZoomScale: number

  scaledImageSize: {}

  componentWillMount() {
    const { image } = this.props

    if (!image) return null
    // Scale an image to the minimum size that is large enough to completely
    // fill the crop box.
    const widthRatio = image.width / this.props.size.width
    const heightRatio = image.height / this.props.size.height

    this.horizontal = widthRatio > heightRatio

    if (this.horizontal) {
      this.scaledImageSize = {
        width: image.width / heightRatio,
        height: this.props.size.height,
      }
    } else {
      this.scaledImageSize = {
        width: this.props.size.width,
        height: image.height / widthRatio,
      }
    }

    this.contentOffset = {
      x: (this.scaledImageSize.width - this.props.size.width) / 2,
      y: (this.scaledImageSize.height - this.props.size.height) / 2,
    }

    this.maximumZoomScale = Math.min(
      image.width / this.scaledImageSize.width,
      image.height / this.scaledImageSize.height
    )

    this.minimumZoomScale = Math.max(
      this.props.size.width / this.scaledImageSize.width,
      this.props.size.height / this.scaledImageSize.height
    )

    this.updateCroppingData(this.contentOffset, this.scaledImageSize, this.props.size)
  }

  onScroll = evt => {
    this.updateCroppingData(
      evt.nativeEvent.contentOffset,
      evt.nativeEvent.contentSize,
      evt.nativeEvent.layoutMeasurement
    )
  }

  updateCroppingData(offset, scaledImageSize, croppedImageSize) {
    // const offsetRatioX = offset.x / scaledImageSize.width
    // const offsetRatioY = offset.y / scaledImageSize.height
    // const sizeRatioX = croppedImageSize.width / scaledImageSize.width
    // const sizeRatioY = croppedImageSize.height / scaledImageSize.height
    // const cropData = {
    //   offset: {
    //     x: this.props.image.width * offsetRatioX,
    //     y: this.props.image.height * offsetRatioY,
    //   },
    //   size: {
    //     width: this.props.image.width * sizeRatioX,
    //     height: this.props.image.height * sizeRatioY,
    //   },
    // }
    // this.props.onCropping(cropData)
  }

  render() {
    const { image } = this.props
    if (!image) return null

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
        <Image source={this.props.image} style={this.scaledImageSize} />
      </ScrollView>
    )
  }
}
