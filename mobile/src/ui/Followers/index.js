import React from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'
import { Text } from 'ui'

function Followers({ t, followers, onPress = null, color = 'dark', opacity = 1 }) {
  return (
    <Text fontSize={15} onPress={onPress} color={color} opacity={opacity}>
      {t('UiFollowers:followers', { count: followers })}
    </Text>
  )
}

Followers.propTypes = {
  onPress: PropTypes.func,
  color: PropTypes.string,
  followers: PropTypes.number.isRequired,
  opacity: PropTypes.number,
}

export default withNamespaces('UiFollowers')(Followers)
