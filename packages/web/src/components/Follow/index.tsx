// @ts-nocheck
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Base } from './styles'

function Follow({ following, onPress }) {
  const { t } = useTranslation()
  return (
    <Base onPress={onPress} black={!following}>
      {following ? t('Follow:unfollow') : t('Follow:follow')}
    </Base>
  )
}

export default Follow
