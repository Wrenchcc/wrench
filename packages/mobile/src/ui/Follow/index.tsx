import React from 'react'
import { useTranslation } from 'react-i18next'
import { Base, Text } from './styles'

function Follow({ onPress, following, small, ...rest }) {
  const { t } = useTranslation()

  return (
    <Base onPress={onPress} black={!following} small={small} {...rest}>
      <Text color={following ? 'dark' : 'white'} medium fontSize={15}>
        {following
          ? small
            ? t('Follow:unfollowSmall')
            : t('Follow:unfollow')
          : small
          ? t('Follow:followSmall')
          : t('Follow:follow')}
      </Text>
    </Base>
  )
}

export default Follow
