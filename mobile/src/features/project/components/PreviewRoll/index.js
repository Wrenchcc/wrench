import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CameraRoll } from 'react-native'
import { pathOr } from 'ramda'
import { logError } from 'utils/analytics'
import { cameraRoll } from 'images'
import { Button, Preview, Icon } from './styles'

export default class PreviewRoll extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
  }

  state = {
    image: '',
  }

  componentDidMount() {
    this.loadPreviewImage()
  }

  loadPreviewImage = async () => {
    try {
      const data = await CameraRoll.getPhotos({ first: 1 })
      const image = pathOr(false, ['edges', 0, 'node', 'image', 'uri'], data)
      this.setState({ image })
    } catch (err) {
      logError(err)
    }
  }

  render = () => (
    <Button onPress={this.props.onPress} hapticFeedback="impactLight">
      {this.state.image ? (
        <Preview source={{ uri: this.state.image }} />
      ) : (
        <Icon source={cameraRoll} />
      )}
    </Button>
  )
}
