import React from 'react'
import { useTranslation } from 'react-i18next'
import { Base, Text } from './styles'

function Follow({ onPress, following, small, ...rest }) {
  const { t } = useTranslation('follow')

  return (
    <Base onPress={onPress} black={!following} small={small} {...rest}>
      <Text color={following ? 'inverse' : 'default'} medium fontSize={15}>
        {following
          ? small
            ? t('unfollowSmall')
            : t('unfollow')
          : small
          ? t('followSmall')
          : t('follow')}
      </Text>
    </Base>
  )
}

export default Follow
