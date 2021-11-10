import React, { useCallback } from 'react'
import { Image, Dimensions, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Text from 'ui/Text'
import { formatTime } from './utils'

const { width } = Dimensions.get('window')

export const MARGIN = 1
export const ITEM_SIZE = width / 4 - MARGIN / 2

function Item({ onPress, item, selected, order }) {
  const handlePress = useCallback(() => onPress(item), [item])

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
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
      <View
        style={{
          width: 24,
          height: 24,
          position: 'absolute',
          right: 5,
          top: 5,
          borderRadius: 24,
          backgroundColor: selected ? 'white' : 'rgba(255, 255, 255, 0.25)',
          borderStyle: 'solid',
          borderWidth: 1.5,
          borderColor: 'white',
          zIndex: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text fontSize={12} bold color="black">
          {order || null}
        </Text>
      </View>
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
    </TouchableWithoutFeedback>
  )
}

export default Item
