import React, { PureComponent } from 'react'
import { Alert } from 'react-native'
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'
import { navigateToOnboarding } from 'navigation'
import withLocalization from 'i18n/withLocalization'
import { warn } from 'utils/logger'
import { Button, Text } from './styled'

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
                parameters: {
                  fields: {
                    string: 'email,name,first_name,last_name,picture.type(large)',
                  },
                },
              },
              (error, result) => {
                if (error) {
                  warn(error)
                } else {
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

export default withLocalization(Facebook, 'Facebook')
