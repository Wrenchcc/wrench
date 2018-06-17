import React from 'react'
import PropTypes from 'prop-types'
import { Touchable } from 'ui'
import { cameraRoll } from 'images'
import { Preview } from './styles'

const PreviewRoll = ({ onPress }) => (
  <Touchable onPress={onPress} hapticFeedback="impactLight">
    <Preview source={cameraRoll} />
  </Touchable>
)

PreviewRoll.propTypes = {
  onPress: PropTypes.func.isRequired,
}

export default PreviewRoll
