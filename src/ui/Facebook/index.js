import React, { PureComponent } from 'react'
import { Alert } from 'react-native'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { compose } from 'react-apollo'
import { authenticateUser } from 'graphql/mutations/user'
import withLocalization from 'i18n/withLocalization'
import { warn } from 'utils/logger'
import { Button, Text } from './styled'

const parameters = {
  fields: { string: 'email,name,first_name,last_name,picture.type(large)' },
}

class Facebook extends PureComponent {
  onPress = () => {
    LoginManager.logInWithReadPermissions(['public_profile']).then(
      result => {
        if (!result.isCancelled) {
          AccessToken.getCurrentAccessToken().then(({ accessToken }) =>
            this.props.authenticateUser(accessToken)
          )
        }
      },
      error => {
        Alert(`Login fail with error: ${error}`)
      }
    )
  }

  render() {
    return (
      <Button onPress={this.onPress}>
        <Text white medium>
          {this.props.t('.button')}
        </Text>
      </Button>
    )
  }
}

export default compose(authenticateUser)(withLocalization(Facebook, 'Facebook'))
