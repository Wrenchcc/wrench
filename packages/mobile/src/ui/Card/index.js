import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Touchable from 'ui/Touchable'
import { Picture, ProjectName, SIZE } from './styles'

const Card = memo(function Card({ image, title, onPress, style = {} }) {
  return (
    <Touchable onPress={onPress} style={style}>
      <Picture source={image} width={SIZE} height={SIZE} />
      <ProjectName numberOfLines={1}>{title}</ProjectName>
    </Touchable>
  )
})

Card.propTypes = {
  image: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.any,
}

export default Card
