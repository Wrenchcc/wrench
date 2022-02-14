import React, { useCallback } from 'react'
import { View } from 'react-native'
import { Text } from 'ui'
import PlatformColor from 'ui/PlatformColor'

const styles = {
  base: {
    height: 50,
    width: '100%',
    background: PlatformColor.default,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}

const EMOJIS = ['🙌 ', '🔥 ', '😎 ', '🤘 ', '👏 ', '👍 ', '👊 ', '👌 ']

function EmojiList({ onPress }) {
  return (
    <View style={styles.base}>
      {EMOJIS.map((emoji) => {
        const handleOnPress = useCallback(() => onPress(emoji), [emoji])

        return (
          <Text fontSize={24} key={emoji} center onPress={handleOnPress}>
            {emoji}
          </Text>
        )
      })}
    </View>
  )
}

export default EmojiList
