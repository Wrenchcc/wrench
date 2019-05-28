import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import Avatar from 'ui/Avatar'
import Text from 'ui/Text'
import { Base, Content } from './styles'

function User({ data }) {
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const handleNavigation = useCallback(
    () => navigate(SCREENS.USER, {
      username: data.username,
    }),
    [data]
  )

  return (
    <Base onPress={handleNavigation}>
      <Avatar uri={data.avatarUrl} size={40} isOnline={data.isOnline} />
      <Content>
        <Text medium>{data.fullName}</Text>
        <Text color="light_grey" fontSize={15}>
          {t('UiUser:projects', { count: data.projectCount })}
        </Text>
      </Content>
    </Base>
  )
}

export default User
