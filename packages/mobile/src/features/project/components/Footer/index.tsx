import React from 'react'
import { Share, Follow } from 'ui'
import { Base } from './styles'

function Footer({ onFollowPress, name, dynamicLink, following, isOwner }) {
  return (
    <Base>
      <Share title={name} url={dynamicLink} />
      {!isOwner && <Follow onPress={onFollowPress} following={following} />}
    </Base>
  )
}

export default Footer
