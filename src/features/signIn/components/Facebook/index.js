import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { compose } from 'react-apollo'
import { authenticateUser } from 'graphql/mutations/authenticateUser'
import withLocalization from 'i18n/withLocalization'
import { Button, Text } from './styled'

class Facebook extends PureComponent {
  static propTypes = {
    authenticateUser: PropTypes.func.isRequired,
  }

  handleLoginManager = async () => {
    const result = await LoginManager.logInWithReadPermissions(['public_profile'])
    if (result.isCancelled) return
    const facebookResponse = await AccessToken.getCurrentAccessToken().then(this.getAccessToken)

    try {
      await this.props.authenticateUser(facebookResponse.accessToken)
    } catch (err) {
      console.log(err)
    }
  }

  render = () => (
    <Button onPress={this.handleLoginManager}>
      <Text white medium>
        {this.props.t('.button')}
      </Text>
    </Button>
  )
}

export default compose(authenticateUser)(withLocalization(Facebook, 'Facebook'))
