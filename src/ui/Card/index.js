import React from 'react'
import PropTypes from 'prop-types'
import { Touchable } from 'ui'
import { Picture, ProjectName } from './styles'

const Card = ({ coverUri, title, onPress, style = {} }) => (
  <Touchable onPress={onPress} style={style}>
    <Picture source={{ uri: coverUri }} />
    <ProjectName numberOfLines={1}>{title}</ProjectName>
  </Touchable>
)

Card.propTypes = {
  coverUri: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.any,
}

export default Card
