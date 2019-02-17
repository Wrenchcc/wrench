import React, { memo } from 'react'
import PropTypes from 'prop-types'
import withTranslation from 'i18n/withTranslation'
import Text from 'ui/Text'
import { follow } from 'images'
import { Button, Icon } from './styles'

const Follow = memo(function Follow({ onPress, following, t }) {
  return (
    <Button onPress={onPress} hapticFeedback="impactLight">
      {following ? (
        <>
          <Icon source={follow} />
          <Text medium>{t('Follow:unfollow')}</Text>
        </>
      ) : (
        <Text medium>{t('Follow:follow')}</Text>
      )}
    </Button>
  )
})

Follow.propTypes = {
  onPress: PropTypes.func.isRequired,
  following: PropTypes.bool.isRequired,
}

export default withTranslation('Follow')(Follow)
