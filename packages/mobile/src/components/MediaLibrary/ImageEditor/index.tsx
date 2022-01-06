import React, { useState, useEffect, useRef, useCallback } from 'react'
import { View, ScrollView, Image } from 'react-native'
import { useReactiveVar, store } from 'gql'
import Grid from './Grid'
import { isAndroid } from 'utils/platform'
import { CROP_AREA } from '../constants'

const styles = {
  container: {
    width: CROP_AREA,
    height: CROP_AREA,
    overflow: 'hidden',
    backgroundColor: 'rgb(34,34,34)',
  },
}

function ImageEditor() {
  const [isMoving, setMoving] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const contentOffset = useRef(null)
  const horizontal = useRef(false)
  const maximumZoomScale = useRef(0)
  const minimumZoomScale = useRef(null)
  const scaledImageSize = useRef(null)
  const prevSourceId = useRef(null)

  const source = useReactiveVar(store.files.selectedFile)

  useEffect(() => {
    if (source && source?.id !== prevSourceId.current) {
      setLoading(true)
      setImageProperties(source)
      prevSourceId.current = source.id
    }
  }, [source])

  const setImageProperties = (image) => {
    const widthRatio = image.width / CROP_AREA
    const heightRatio = image.height / CROP_AREA

    horizontal.current = widthRatio > heightRatio

    if (horizontal.current) {
      scaledImageSize.current = {
        height: CROP_AREA,
        width: image.width / heightRatio,
      }
    } else {
      scaledImageSize.current = {
        height: image.height / widthRatio,
        width: CROP_AREA,
      }
      if (isAndroid) {
        scaledImageSize.current.width *= 1
        scaledImageSize.current.height *= 1
        horizontal.current = true
      }
    }

    contentOffset.current = {
      x: (scaledImageSize.current.width - CROP_AREA) / 2,
      y: (scaledImageSize.current.height - CROP_AREA) / 2,
    }

    maximumZoomScale.current = Math.min(
      image.width / scaledImageSize.current.width,
      image.height / scaledImageSize.current.height
    )

    minimumZoomScale.current = Math.max(
      CROP_AREA / scaledImageSize.current.width,
      CROP_AREA / scaledImageSize.current.height
    )

    handleOnEditImage(contentOffset.current, scaledImageSize.current, {
      height: CROP_AREA,
      width: CROP_AREA,
    })
  }

  const onLoadEnd = useCallback(() => setLoading(false), [])

  const onScrollBegin = useCallback(() => setMoving(true), [])

  const onScrollEndDrag = (evt) => {
    setMoving(false)
    handleOnEditImage(
      evt.nativeEvent.contentOffset,
      evt.nativeEvent.contentSize,
      evt.nativeEvent.layoutMeasurement
    )
  }

  const handleOnEditImage = (offset, scaledImageSize, croppedImageSize) => {
    const offsetRatioX = offset.x / scaledImageSize.width
    const offsetRatioY = offset.y / scaledImageSize.height
    const sizeRatioX = croppedImageSize.width / scaledImageSize.width
    const sizeRatioY = croppedImageSize.height / scaledImageSize.height

    store.files.edit({
      height: source?.height * sizeRatioY,
      originX: source?.width * offsetRatioX,
      originY: source?.height * offsetRatioY,
      width: source?.width * sizeRatioX,
    })
  }

  return (
    <View style={styles.container} key={source?.id}>
      <ScrollView
        alwaysBounceVertical
        automaticallyAdjustContentInsets={false}
        contentOffset={contentOffset.current}
        decelerationRate="fast"
        horizontal={horizontal.current}
        maximumZoomScale={maximumZoomScale.current}
        minimumZoomScale={minimumZoomScale.current}
        onScrollBeginDrag={onScrollBegin}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onScrollEndDrag}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
      >
        <Image
          blurRadius={isLoading ? 50 : 0}
          onLoadEnd={onLoadEnd}
          style={scaledImageSize.current}
          source={source}
        />
      </ScrollView>
      {isMoving && <Grid />}
    </View>
  )
}

export default React.memo(ImageEditor)
