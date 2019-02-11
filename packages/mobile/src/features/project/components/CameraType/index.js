import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { cameraType } from 'images'
import { Button, Icon } from './styles'

const CameraType = memo(({ onPress }) => (
    <Button onPress={onPress} hapticFeedback="impactLight">
      <Icon source={cameraType} />
    </Button>
))

CameraType.propTypes = {
  onPress: PropTypes.func.isRequired,
}

export default CameraType
