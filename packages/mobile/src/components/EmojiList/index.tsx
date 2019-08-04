import React, { useCallback } from 'react'
import { Text } from 'ui'
import { Base } from './styles'

const EMOJIS = ['🙌 ', '🔥 ', '😎 ', '🤘 ', '👏 ', '👍 ', '👊 ', '👌 ']

function EmojiList({ onPress }) {
  const handleOnPress = useCallback(() => onPress(emoji), [onPress])

  return (
    <Base>
      {EMOJIS.map(emoji => (
        <Text fontSize={28} key={emoji} center onPress={handleOnPress}>
          {emoji}
        </Text>
      ))}
    </Base>
  )
}

export default EmojiList
