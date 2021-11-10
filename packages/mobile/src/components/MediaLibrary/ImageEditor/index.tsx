import React, { PureComponent } from 'react'
import { View, Dimensions, ScrollView, Image } from 'react-native'
import { COLORS } from 'ui/constants'
import Grid from './Grid'
import { isAndroid } from 'utils/platform'
import { CROP_AREA } from '../constants'

export default class ImageEditor extends PureComponent {
  private state = {
    isLoading: true,
    isMoving: false,
  }

  private contentOffset = {}

  private horizontal = false

  private maximumZoomScale = 0

  private minimumZoomScale = null

  private scaledImageSize = null

  private componentDidMount() {
    if (!this.props.source) {
      return
    }

    this.setImageProperties(this.props.source)
  }

  private componentDidUpdate(prevProps) {
    if (this.props.source.uri !== prevProps.source.uri) {
      this.handleLoading(true)
      this.setImageProperties(this.props.source)
    }
  }

  private setImageProperties(image) {
    const widthRatio = image.width / CROP_AREA
    const heightRatio = image.height / CROP_AREA

    this.horizontal = widthRatio > heightRatio

    if (this.horizontal) {
      this.scaledImageSize = {
        height: CROP_AREA,
        width: image.width / heightRatio,
      }
    } else {
      this.scaledImageSize = {
        height: image.height / widthRatio,
        width: CROP_AREA,
      }
      if (isAndroid) {
        this.scaledImageSize.width *= 1
        this.scaledImageSize.height *= 1
        this.horizontal = true
      }
    }

    this.contentOffset = {
      x: (this.scaledImageSize.width - CROP_AREA) / 2,
      y: (this.scaledImageSize.height - CROP_AREA) / 2,
    }

    this.maximumZoomScale = Math.min(
      image.width / this.scaledImageSize.width,
      image.height / this.scaledImageSize.height
    )

    this.minimumZoomScale = Math.max(
      CROP_AREA / this.scaledImageSize.width,
      CROP_AREA / this.scaledImageSize.height
    )

    this.handleOnEditImage(this.contentOffset, this.scaledImageSize, {
      height: CROP_AREA,
      width: CROP_AREA,
    })
  }

  private handleLoading = (isLoading) => {
    this.setState({ isLoading })
  }

  private onScroll = (evt) => {
    this.setState({ isMoving: false })

    this.handleOnEditImage(
      evt.nativeEvent.contentOffset,
      evt.nativeEvent.contentSize,
      evt.nativeEvent.layoutMeasurement
    )
  }

  private handleOnEditImage(offset, scaledImageSize, croppedImageSize) {
    const offsetRatioX = offset.x / scaledImageSize.width
    const offsetRatioY = offset.y / scaledImageSize.height
    const sizeRatioX = croppedImageSize.width / scaledImageSize.width
    const sizeRatioY = croppedImageSize.height / scaledImageSize.height

    this.props.onChange({
      height: this.props.source.height * sizeRatioY,
      originX: this.props.source.width * offsetRatioX,
      originY: this.props.source.height * offsetRatioY,
      width: this.props.source.width * sizeRatioX,
    })
  }

  private render() {
    const { isLoading, isMoving } = this.state

    return (
      <View key={this.props.source.uri}>
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
          onScrollBeginDrag={() => this.setState({ isMoving: true })}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
        >
          <Image
            style={[{ backgroundColor: COLORS.DARK_GREY }, this.scaledImageSize]}
            source={this.props.source}
            blurRadius={isLoading ? 20 : 0}
            onLoadEnd={() => this.handleLoading(false)}
          />
        </ScrollView>
        {isMoving && <Grid />}
      </View>
    )
  }
}
