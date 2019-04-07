import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import withTranslation from 'i18n/withTranslation'
import Avatar from 'ui/Avatar'
import Text from 'ui/Text'
import { navigateToUser } from 'navigation-old/actions'
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
}

export default withTranslation('UiUser')(User)
