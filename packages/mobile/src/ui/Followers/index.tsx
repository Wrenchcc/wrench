import React from 'react'
import { useTranslation } from 'react-i18next'
import Text from 'ui/Text'

function Followers({ followers, onPress = null, color = 'dark', opacity = 1, style }) {
  const { t } = useTranslation()
  return (
    <Text fontSize={15} onPress={onPress} color={color} opacity={opacity} style={style}>
      {t('UiFollowers:followers', { count: followers })}
    </Text>
  )
}

export default Followers
