import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import Text from '../Text'

const Followers = memo(function Followers({ count, className }) {
  const { t } = useTranslation()
  return (
    <Text className={className} fontSize={15}>
      {t('UiFollowers:followers', { count })}
    </Text>
  )
})

export default Followers
