import React, { Component } from 'react'
import { Image, View, Dimensions, TouchableOpacity } from 'react-native'
import styles from './styles'

export default class Item extends Component {
  state = {
    imageSize: 0,
  }

  componentWillMount() {
    let { width } = Dimensions.get('window')
    const { imageMargin, itemsPerRow, containerWidth } = this.props

    if (typeof containerWidth !== 'undefined') {
      width = containerWidth
    }
    this.setState({ imageSize: (width - (itemsPerRow + 1) * imageMargin) / itemsPerRow })
  }

  renderMarker(markIcon) {
    return null
  }

  render() {
    const { item, selected, customSelectMarker, imageMargin, markIcon, onClick } = this.props

    const marker = customSelectMarker || this.renderMarker(markIcon)

    return (
      <TouchableOpacity
        style={{ marginBottom: imageMargin, marginRight: imageMargin }}
        onPress={() => onClick(item.node)}
      >
        <Image
          source={{ uri: item.node.image.uri }}
          style={{ height: this.state.imageSize, width: this.state.imageSize }}
        />
        {selected && marker}
        {selected && <View style={styles.overlay} />}
      </TouchableOpacity>
    )
  }
}
