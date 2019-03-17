import React, { memo } from 'react'
import PropTypes from 'prop-types'
import withTranslation from 'i18n/withTranslation'
import Text from 'ui/Text'

const Followers = memo(function Followers({
  t,
  followers,
  onPress = null,
  color = 'dark',
  opacity = 1,
  style,
}) {
  return (
    <Text fontSize={15} onPress={onPress} color={color} opacity={opacity} style={style}>
      {t('UiFollowers:followers', { count: followers })}
    </Text>
  )
})

Followers.propTypes = {
  onPress: PropTypes.func,
  color: PropTypes.string,
  followers: PropTypes.number.isRequired,
  opacity: PropTypes.number,
  style: PropTypes.array,
}

export default withTranslation('UiFollowers')(Followers)
