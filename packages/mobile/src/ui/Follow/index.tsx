import React from 'react'
import { useTranslation } from 'react-i18next'
import { Base, Text } from './styles'

function Follow({ onPress, following }) {
  const { t } = useTranslation()

  return (
    <Base onPress={onPress} black={!following}>
      <Text color={following ? 'dark' : 'white'} medium fontSize={15}>
        {following ? t('Follow:unfollow') : t('Follow:follow')}
      </Text>
    </Base>
  )
}

export default Follow
