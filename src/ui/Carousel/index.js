import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView } from 'react-native'
import { Touchable } from 'ui'
import { IMAGE_PRIORITY } from 'ui/constants'
import { deviceWidth, Wrapper, Picture, GUTTER, BAR_SPACE } from './styles'

const SNAP_INTERVAL = deviceWidth - (GUTTER + BAR_SPACE)

// TODO: Change to flatlist and fix snap
const Carousel = ({ images, onPress, disabled = false, onLongPress = null }) => (
  <ScrollView
    keyboardShouldPersistTaps="always"
    scrollEnabled={images.length > 1}
    horizontal
    directionalLockEnabled
    showsHorizontalScrollIndicator={false}
    decelerationRate="fast"
    snapToInterval={SNAP_INTERVAL}
    snapToAlignment="center"
    scrollThrottle={10}
    grow
    style={{
      marginLeft: -GUTTER,
      marginRight: -GUTTER,
      overflow: 'visible',
    }}
  >
    {images.map(({ uri }, index) => (
      <Wrapper
        maximumZoomScale={1.00000001}
        minimumZoomScale={1}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bouncesZoom
        key={uri}
        first={index === 0}
        last={index === images.length - 1}
      >
        <Touchable
          onPress={onPress}
          disabled={disabled}
          activeOpacity={1}
          onLongPress={onLongPress}
        >
          <Picture
            source={{ uri }}
            priority={index < 2 ? IMAGE_PRIORITY.HIGHT : IMAGE_PRIORITY.LOW}
          />
        </Touchable>
      </Wrapper>
    ))}
  </ScrollView>
)

Carousel.propTypes = {
  images: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  onLongPress: PropTypes.func,
}

export default Carousel
