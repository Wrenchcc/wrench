import React from 'react'
import PropTypes from 'prop-types'
import Config from 'react-native-config'
import { Share, Follow } from 'ui'
import { Base } from './styles'

// TODO: Share website url or deeplink from firebase
const Footer = ({ onFollowPress, name, id, following }) => (
  <Base>
    <Share name={name} url={`${Config.DEEP_LINK_BASE}project/${id}`} />
    <Follow onPress={onFollowPress} following={following} />
  </Base>
)

Footer.propTypes = {
  onFollowPress: PropTypes.func.isRequired,
  following: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default Footer
