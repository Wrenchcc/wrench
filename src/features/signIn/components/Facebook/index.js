import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { compose } from 'react-apollo'
import { authenticateUser, addCurrentUser } from 'graphql/mutations/user'
import withLocalization from 'i18n/withLocalization'
import { Button, Text } from './styled'

class Facebook extends PureComponent {
  static propTypes = {
    authenticateUser: PropTypes.func.isRequired,
    addCurrentUser: PropTypes.func.isRequired,
  }

  getAccessToken = async ({ accessToken }) => {
    const response = await this.props.authenticateUser(accessToken)
    const { token, refreshToken, user } = response.data.authenticateUser
    this.props.addCurrentUser({ token, refreshToken, ...user })
  }

  handleLoginManager = () => {
    LoginManager.logInWithReadPermissions(['public_profile']).then(result => {
      if (!result.isCancelled) {
        AccessToken.getCurrentAccessToken().then(this.getAccessToken)
      }
    })
  }

  render = () => (
    <Button onPress={this.handleLoginManager}>
      <Text white medium>
        {this.props.t('.button')}
      </Text>
    </Button>
  )
}

export default compose(
  authenticateUser,
  addCurrentUser
)(withLocalization(Facebook, 'Facebook'))
