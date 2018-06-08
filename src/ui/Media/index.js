import React from 'react'
import Gallery from './Gallery'
import Caption from './Caption'
import { MEDIA_TYPES } from './constants'

const Media = ({ post, onPress, disabled = false, onLongPress }) => {
  switch (post.type) {
    case MEDIA_TYPES.IMAGE:
      return <Gallery {...post} onPress={onPress} disabled={disabled} onLongPress={onLongPress} />
    case MEDIA_TYPES.TEXT:
      return <Caption {...post} onPress={onPress} disabled={disabled} />
    case MEDIA_TYPES.VIDEO:
      return null
    default:
      return null
  }
}

export default Media
