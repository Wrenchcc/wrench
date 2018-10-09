import React, { PureComponent } from 'react'
import { Image, View, Dimensions, TouchableOpacity } from 'react-native'
import styles from './styles'

export default class Item extends PureComponent {
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

  render() {
    const { item, selected, imageMargin, onClick } = this.props

    return (
      <TouchableOpacity
        style={{ marginBottom: imageMargin, marginRight: imageMargin }}
        onPress={() => onClick(item.node)}
        activeOpacity={1}
      >
        <Image
          source={{ uri: item.node.image.uri }}
          style={{ height: this.state.imageSize, width: this.state.imageSize }}
        />
        {selected && null}
        {selected && <View style={styles.overlay} />}
      </TouchableOpacity>
    )
  }
}
