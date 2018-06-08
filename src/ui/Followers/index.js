import React from 'react'
import PropTypes from 'prop-types'
import humanFormat from 'human-format'
import withLocalization from 'i18n/withLocalization'
import { Text } from 'ui'

const Followers = ({ t, followers, onPress = null, color = 'dark' }) => (
  <Text fontSize={15} onPress={onPress} color={color}>
    {`${humanFormat(followers, {
      separator: '',
      decimals: 1,
    })} ${t('.followers')}`}
  </Text>
)

Followers.propTypes = {
  onPress: PropTypes.func,
  color: PropTypes.string,
  followers: PropTypes.number.isRequired,
}

export default withLocalization(Followers, 'Followers')
