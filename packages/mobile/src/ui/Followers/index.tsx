import React from 'react'
import { useTranslation } from 'react-i18next'
import Text from 'ui/Text'

type FollowersProps = {
  followers: number
  onPress?: () => void
  color?: string
  opacity?: number
  style?: Record<string, any>
}

function Followers({
  followers,
  onPress = null,
  color = 'inverse',
  opacity = 1,
  style,
}: FollowersProps) {
  const { t } = useTranslation('followers')

  return (
    <Text fontSize={15} onPress={onPress} color={color} opacity={opacity} style={style}>
      {t('followers', { count: followers })}
    </Text>
  )
}

export default Followers
