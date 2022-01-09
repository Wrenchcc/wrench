import React, { useCallback } from 'react'
import { Image, Dimensions, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useReactiveVar, store } from 'gql'
import Text from 'ui/Text'
import { formatTime } from './utils'

const { width } = Dimensions.get('window')

export const MARGIN = 1
export const ITEM_SIZE = width / 4 - MARGIN / 2

const styles = {
  duration: {
    color: 'white',
    position: 'absolute',
    zIndex: 100,
    right: 5,
    bottom: 5,
  },
  image: {
    marginLeft: MARGIN,
    marginTop: MARGIN,
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    backgroundColor: 'rgb(34,34,34)',
  },
  circle: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 5,
    top: 5,
    borderRadius: 24,
    borderStyle: 'solid',
    borderWidth: 1.5,
    borderColor: 'white',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    position: 'absolute',
    zIndex: 10,
  },
}

function Item({ onPress, item }) {
  const handlePress = useCallback(() => onPress(item), [item])
  const selectedFiles = useReactiveVar(store.files.selectedFilesVar)
  const order = selectedFiles.findIndex((e) => e.id === item.id) + 1
  const selected = selectedFiles.some((file) => file.id === item.id)

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      {item.duration > 0 && <Text style={styles.duration}>{formatTime(item.duration)}</Text>}
      <Image fadeDuration={0} style={styles.image} source={item} />
      <View
        style={[
          styles.circle,
          { backgroundColor: selected ? 'white' : 'rgba(255, 255, 255, 0.25)' },
        ]}
      >
        <Text fontSize={12} bold color="black">
          {order || null}
        </Text>
      </View>
      {selected && <View style={styles.overlay} />}
    </TouchableWithoutFeedback>
  )
}

export default React.memo(Item)
