import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import Text from 'ui/Text'
import { follow } from 'images'
import { Button, Icon } from './styles'

function Follow({ onPress, following }) {
  const { t } = useTranslation()

  return (
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
}

export default Follow
