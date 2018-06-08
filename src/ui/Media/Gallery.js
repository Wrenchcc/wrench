import React from 'react'
import PropTypes from 'prop-types'
import { Carousel } from 'ui'
import { Base, Caption } from './styles'

const Gallery = ({ images, caption, onPress, disabled = false, onLongPress }) => (
  <Base>
    {caption && <Caption caption={caption} onPress={onPress} disabled={disabled} />}
    <Carousel images={images} onPress={onPress} disabled={disabled} onLongPress={onLongPress} />
  </Base>
)

Gallery.propTypes = {
  images: PropTypes.any.isRequired,
  caption: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  onLongPress: PropTypes.func,
  disabled: PropTypes.bool,
}

export default Gallery
