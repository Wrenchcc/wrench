import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import withTranslation from 'i18n/withTranslation'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { compose } from 'react-apollo'
import { track, events } from 'utils/analytics'
import { logError } from 'utils/sentry'
import { authenticateFacebook } from 'graphql/mutations/user/authenticateFacebook'
import { Button, Text } from './styled'

class Facebook extends PureComponent {
  static propTypes = {
    changeLoginState: PropTypes.func.isRequired,
    authenticateFacebook: PropTypes.func.isRequired,
  }

  handleLoginManager = async () => {
    try {
      // If switching accounts reset LoginManager
      // https://github.com/facebook/react-native-fbsdk/issues/279
      LoginManager.logOut()

      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email'])

      if (result.isCancelled) {
        return
      }

      const facebookResponse = await AccessToken.getCurrentAccessToken()

      await this.props.authenticateFacebook(facebookResponse.accessToken)
      this.props.changeLoginState(true)
      track(events.USER_SIGNED_IN_FACEBOOK_SUCCESSFULL)
    } catch (err) {
      track(events.USER_SIGNED_IN_FACEBOOK_FAILED)
      logError(err)
    }
  }

  render() {
    return (
      <Button onPress={this.handleLoginManager}>
        <Text white medium>
          {this.props.t('Facebook:button')}
        </Text>
      </Button>
    )
  }
}

export default compose(
  authenticateFacebook,
  withTranslation('Facebook')
)(Facebook)
