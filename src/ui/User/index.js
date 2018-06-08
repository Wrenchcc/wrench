import React from 'react'
import PropTypes from 'prop-types'
import withLocalization from 'i18n/withLocalization'
import { Avatar, Text } from 'ui'
import { navigateToProfile } from 'navigation'
import { Base, Content } from './styles'

const User = ({ t, data }) => (
  <Base onPress={() => navigateToProfile(data)}>
    <Avatar uri={data.user.avatarUrl} size={40} />
    <Content>
      <Text medium>{data.user.fullName}</Text>
      <Text color="light_grey" fontSize={15}>
        {t('.projects', { count: data.projects.length })}
      </Text>
    </Content>
  </Base>
)

User.propTypes = {
  data: PropTypes.object.isRequired,
}

export default withLocalization(User, 'UiUser')
