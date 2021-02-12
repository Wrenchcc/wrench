import React, { useCallback, memo } from 'react'
import { Pressable, Image, Dimensions, Text, View } from 'react-native'
import { formatTime } from './utils'

const { width } = Dimensions.get('window')

export const MARGIN = 1
export const ITEM_SIZE = width / 4 - MARGIN / 2

function Item({ onPress, item, selected }) {
  const handlePress = useCallback(() => onPress(item), [item])

  return (
    <Pressable onPress={handlePress}>
      {item.duration > 0 && (
        <Text
          style={{
            color: 'white',
            position: 'absolute',
            zIndex: 100,
            right: 5,
            bottom: 5,
          }}
        >
          {formatTime(item.duration)}
        </Text>
      )}
      <Image
        fadeDuration={0}
        style={{
          marginLeft: MARGIN,
          marginTop: MARGIN,
          width: ITEM_SIZE,
          height: ITEM_SIZE,
          backgroundColor: 'rgb(34,34,34)',
        }}
        source={item}
      />
      {selected && (
        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            width: ITEM_SIZE,
            height: ITEM_SIZE,
            position: 'absolute',
            zIndex: 10,
          }}
        />
      )}
    </Pressable>
  )
}

export default memo(Item)
