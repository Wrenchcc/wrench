import React, { Component } from 'react'
import Permissions from 'react-native-permissions'
import PropTypes from 'prop-types'
import { CameraRoll } from 'react-native'
import { Button, Preview } from './styles'

const PERMISSION = 'authorized'

export default class PreviewRoll extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
  }

  state = {
    image: null,
  }

  componentDidMount() {
    Permissions.check('photo').then(res => {
      if (res === PERMISSION) {
        this.loadPreviewImage()
      }
    })
  }

  loadPreviewImage = async () => {
    const data = await CameraRoll.getPhotos({ first: 1 })
    const image = data.edges[0].node.image.uri
    this.setState({ image })
  }

  render() {
    const { image } = this.state
    return (
      <Button onPress={this.props.onPress} hapticFeedback="impactLight">
        {image && <Preview source={{ uri: image }} disableAnimation />}
      </Button>
    )
  }
}
