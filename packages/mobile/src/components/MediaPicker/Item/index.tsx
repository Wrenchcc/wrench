import React, { useCallback, memo } from 'react'
import { Dimensions, Image } from 'react-native'
import { Text, Touchable } from 'ui'
import { COLORS } from 'ui/constants'
import { Marker, Overlay } from './styles'

const { width } = Dimensions.get('window')

export const MARGIN = 3
export const ITEM_SIZE = (width - 4 * MARGIN) / 4

function Item({ item, selected, onPress, order }) {
  const handleOnPress = useCallback(() => onPress(item), [item, onPress])

  return (
    <Touchable
      nativeHandler
      style={{
        backgroundColor: COLORS.DARK_GREY,
        marginBottom: MARGIN,
        marginRight: MARGIN,
      }}
      onPress={handleOnPress}
      activeOpacity={1}
    >
      <Image source={item} style={{ height: ITEM_SIZE, width: ITEM_SIZE }} />

      <Marker selected={selected}>
        <Text fontSize={12} bold>
          {order || null}
        </Text>
      </Marker>
      <Overlay selected={selected} />
    </Touchable>
  )
}

export default memo(Item)
