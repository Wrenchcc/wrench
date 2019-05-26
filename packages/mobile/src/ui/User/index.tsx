import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useNavigation, SCREENS } from 'navigation'
import withTranslation from 'i18n/withTranslation'
import Avatar from 'ui/Avatar'
import Text from 'ui/Text'
import { Base, Content } from './styles'

function User({ t, data }) {
  const { navigate } = useNavigation()
  const handleNavigation = useCallback(
    () => navigate(SCREENS.USER, {
      username: data.username,
    }),
    []
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

User.propTypes = {
  data: PropTypes.object.isRequired,
}

export default withTranslation('UiUser')(User)
