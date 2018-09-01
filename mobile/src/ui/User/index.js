import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import withLocalization from 'i18n/withLocalization'
import { Avatar, Text } from 'ui'
import { navigateToUser } from 'navigation'
import { Base, Content } from './styles'

class User extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  goToProfile = () => {
    const { data } = this.props
    navigateToUser({ user: data })
  }

  render() {
    const { t, data } = this.props
    return (
      <Base onPress={this.goToProfile}>
        <Avatar uri={data.avatarUrl} size={40} />
        <Content>
          <Text medium>{data.fullName}</Text>
          <Text color="light_grey" fontSize={15}>
            {t('.projects', { count: data.projectCount })}
          </Text>
        </Content>
      </Base>
    )
  }
}

export default withLocalization(User, 'UiUser')
