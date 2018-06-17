import React from 'react'
import PropTypes from 'prop-types'
import { cameraRoll } from 'images'
import { Button, Preview } from './styles'

const PreviewRoll = ({ onPress }) => (
  <Button onPress={onPress} hapticFeedback="impactLight">
    <Preview source={cameraRoll} />
  </Button>
)

PreviewRoll.propTypes = {
  onPress: PropTypes.func.isRequired,
}

export default PreviewRoll
