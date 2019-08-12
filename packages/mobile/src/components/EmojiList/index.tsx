import React from 'react'
import { Text } from 'ui'
import { Base } from './styles'

const EMOJIS = ['🙌 ', '🔥 ', '😎 ', '🤘 ', '👏 ', '👍 ', '👊 ', '👌 ']

function EmojiList({ onPress }) {
  return (
    <Base>
      {EMOJIS.map(emoji => (
        <Text fontSize={28} key={emoji} center onPress={() => onPress(emoji)}>
          {emoji}
        </Text>
      ))}
    </Base>
  )
}

export default EmojiList
