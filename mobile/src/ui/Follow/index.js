import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import Text from 'ui/Text'
import { follow } from 'images'
import { Button, Icon } from './styles'

const Follow = ({ onPress, following, t }) => (
  <Button onPress={onPress} hapticFeedback="impactLight">
    {following ? (
      <Fragment>
        <Icon source={follow} />
        <Text medium>{t('Follow:unfollow')}</Text>
      </Fragment>
    ) : (
      <Text medium>{t('Follow:follow')}</Text>
    )}
  </Button>
)

Follow.propTypes = {
  onPress: PropTypes.func.isRequired,
  following: PropTypes.bool.isRequired,
}

export default translate('Follow')(Follow)
