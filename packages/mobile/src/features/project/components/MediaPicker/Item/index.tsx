import React, { useCallback } from 'react'
import { Image, Dimensions } from 'react-native'
import { Text, Touchable } from 'ui'
import { COLORS } from 'ui/constants'
import { Marker, Overlay } from './styles'

const { width } = Dimensions.get('window')

const MARGIN = 3
const ITEM_SIZE = (width - 4 * MARGIN) / 4

function Item({ item, selected, onPress, order }) {
  const handleOnPress = useCallback(() => onPress(item), [item, onPress])

  return (
    <Touchable
      hapticFeedback="impactLight"
      style={{
        backgroundColor: COLORS.DARK_GREY,
        marginBottom: MARGIN,
        marginRight: MARGIN,
      }}
      onPress={handleOnPress}
      activeOpacity={1}
    >
      <Image source={{ uri: item.uri }} style={{ height: ITEM_SIZE, width: ITEM_SIZE }} />

      <Marker selected={selected}>
        <Text fontSize={12} bold>
          {order || null}
        </Text>
      </Marker>
      <Overlay selected={selected} />
    </Touchable>
  )
}

export default Item
