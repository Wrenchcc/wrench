import React from 'react'
import PropTypes from 'prop-types'
import { Share, Follow } from 'ui'
import { Base } from './styles'

function Footer({ onPress, name, dynamicLink, following, isOwner }) {
  return (
    <Base>
      <Share title={name} url={dynamicLink} />
      {!isOwner && <Follow onPress={onPress} following={following} />}
    </Base>
  )
}

Footer.propTypes = {
  onPress: PropTypes.func.isRequired,
  following: PropTypes.bool.isRequired,
  isOwner: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  dynamicLink: PropTypes.string.isRequired,
}

export default Footer
