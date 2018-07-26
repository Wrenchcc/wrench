import React, { PureComponent } from 'react'
import { Alert } from 'react-native'
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'
import { compose } from 'react-apollo'
import { addloggedInUser } from 'graphql/mutations/user'
import { navigateToOnboarding } from 'navigation'
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
          AccessToken.getCurrentAccessToken().then(({ accessToken }) => {
            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken,
                parameters,
              },
              (error, result) => {
                if (error) {
                  warn(error)
                } else {
                  // TODO: Send mutation to server
                  // Get response and save to state
                  this.props.addloggedInUser({
                    id: result.id,
                    fullName: result.name,
                    firstName: result.first_name,
                    lastName: result.last_name,
                    avatarUrl: result.picture.data.url,
                    token: '123',
                    refreshToken: '456',
                  })

                  setTimeout(() => navigateToOnboarding(), 1000)
                }
              }
            )

            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start()
          })
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

export default compose(addloggedInUser)(withLocalization(Facebook, 'Facebook'))
