import React from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'
import Text from 'ui/Text'
import { follow } from 'images'
import { Button, Icon } from './styles'

const Follow = ({ onPress, following, t }) => (
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

Follow.propTypes = {
  onPress: PropTypes.func.isRequired,
  following: PropTypes.bool.isRequired,
}

export default withNamespaces('Follow')(Follow)
