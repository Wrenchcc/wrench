import React, { PureComponent } from 'react'
import { Image, Dimensions } from 'react-native'
import { Text, Touchable } from 'ui'
import { Marker } from './styles'

const { width } = Dimensions.get('window')

const MARGIN = 3
const IMAGE_SIZE = (width - 4 * MARGIN) / 4

export default class Item extends PureComponent {
  render() {
    const { item, selected, onPress, order } = this.props
    return (
      <Touchable
        style={{ marginBottom: MARGIN, marginRight: MARGIN }}
        onPress={() => onPress(item.node)}
        activeOpacity={1}
      >
        <Image
          source={{ uri: item.node.image.uri }}
          style={{ height: IMAGE_SIZE, width: IMAGE_SIZE }}
        />

        <Marker selected={selected}>
          <Text fontSize={12} bold>
            {order || null}
          </Text>
        </Marker>
      </Touchable>
    )
  }
}
