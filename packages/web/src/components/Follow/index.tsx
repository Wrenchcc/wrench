// @ts-nocheck
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Base } from './styles'

function Follow({ following }) {
  const { t } = useTranslation()
  return <Base black={following}>{following ? t('Follow:unfollow') : t('Follow:follow')}</Base>
}

export default Follow
