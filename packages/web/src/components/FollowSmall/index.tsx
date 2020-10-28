// @ts-nocheck
import React from 'react'
import { useTranslation } from 'i18n'
import { Base } from './styles'

function FollowSmall({ following, onPress }) {
  const { t } = useTranslation('follow')
  return <Base onPress={onPress}>{following ? t('UNFOLLOW') : t('FOLLOW')}</Base>
}

export default FollowSmall
