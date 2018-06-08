import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CameraRoll } from 'react-native'
import { Button, Preview } from './styles'

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
    const data = await CameraRoll.getPhotos({ first: 1 })
    const image = data.edges[0].node.image.uri
    this.setState({ image })
  }

  render = () => (
    <Button onPress={this.props.onPress} hapticFeedback="impactLight">
      <Preview source={{ uri: this.state.image }} />
    </Button>
  )
}
