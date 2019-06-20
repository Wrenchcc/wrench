import React, { useRef, useEffect, useState } from 'react'
import {
  View,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Platform,
} from 'react-native'
import { COLORS } from 'ui/constants'

const { width } = Dimensions.get('window')

const IMAGE_EDITOR_HEIGHT = width
const IMAGE_EDITOR_WIDTH = width

function ImageEditor({ file, onEdit }) {
  const [isLoading, setIsLoading] = useState(true)
  const contentOffset = useRef({})
  const horizontal = useRef(false)
  const maximumZoomScale = useRef(0)
  const minimumZoomScale = useRef()
  const scaledImageSize = useRef()

  const handleOnEditImage = (offset, scaled, cropped) => {
    const offsetRatioX = offset.x / scaled.width
    const offsetRatioY = offset.y / scaled.height
    const sizeRatioX = cropped.width / scaled.width
    const sizeRatioY = cropped.height / scaled.height

    onEdit({
      height: file.height * sizeRatioY,
      originX: file.width * offsetRatioX,
      originY: file.height * offsetRatioY,
      width: file.width * sizeRatioX,
    })
  }

  useEffect(() => {
    const widthRatio = file.width / IMAGE_EDITOR_WIDTH
    const heightRatio = file.height / IMAGE_EDITOR_HEIGHT

    setIsLoading(true)

    horizontal.current = widthRatio > heightRatio

    if (horizontal.current) {
      scaledImageSize.current = {
        height: IMAGE_EDITOR_HEIGHT,
        width: file.width / heightRatio,
      }
    } else {
      scaledImageSize.current = {
        height: file.height / widthRatio,
        width: IMAGE_EDITOR_WIDTH,
      }

      if (Platform.OS === 'android') {
        scaledImageSize.current.width *= 2
        scaledImageSize.current.height *= 2
        horizontal.current = true
      }
    }

    contentOffset.current = {
      x: (scaledImageSize.current.width - IMAGE_EDITOR_WIDTH) / 2,
      y: (scaledImageSize.current.height - IMAGE_EDITOR_HEIGHT) / 2,
    }

    maximumZoomScale.current = Math.min(
      file.width / scaledImageSize.current.width,
      file.height / scaledImageSize.current.height
    )

    minimumZoomScale.current = Math.max(
      IMAGE_EDITOR_WIDTH / scaledImageSize.current.width,
      IMAGE_EDITOR_HEIGHT / scaledImageSize.current.height
    )

    handleOnEditImage(contentOffset.current, scaledImageSize.current, {
      height: IMAGE_EDITOR_HEIGHT,
      width: IMAGE_EDITOR_WIDTH,
    })
  }, [file])

  const onScroll = ({ nativeEvent }) => {
    handleOnEditImage(
      nativeEvent.contentOffset,
      nativeEvent.contentSize,
      nativeEvent.layoutMeasurement
    )
  }

  return (
    <View key={file.uri}>
      <ScrollView
        alwaysBounceVertical
        automaticallyAdjustContentInsets={false}
        contentOffset={contentOffset.current}
        decelerationRate="fast"
        horizontal={horizontal.current}
        maximumZoomScale={maximumZoomScale.current}
        minimumZoomScale={minimumZoomScale.current}
        onMomentumScrollEnd={onScroll}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
      >
        <Image
          style={[{ backgroundColor: COLORS.DARK_GREY }, scaledImageSize.current]}
          source={file}
          blurRadius={isLoading ? 20 : 0}
          onLoadEnd={() => setIsLoading(false)}
        />
      </ScrollView>
    </View>
  )
}

export default ImageEditor
