import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { compose } from 'react-apollo'
import { track, events } from 'utils/analytics'
import { authenticateUser } from 'graphql/mutations/user/authenticateUser'
import { Button, Text } from './styled'

class Facebook extends PureComponent {
  static propTypes = {
    changeLoginState: PropTypes.func.isRequired,
    authenticateUser: PropTypes.func.isRequired,
  }

  handleLoginManager = async () => {
    const result = await LoginManager.logInWithReadPermissions(['public_profile'])
    if (result.isCancelled) return
    const facebookResponse = await AccessToken.getCurrentAccessToken().then(this.getAccessToken)

    try {
      await this.props.authenticateUser(facebookResponse.accessToken)
      this.props.changeLoginState(true)
      track(events.USER_SIGNED_IN_FACEBOOK_SUCCESSFULL)
    } catch (err) {
      track(events.USER_SIGNED_IN_FACEBOOK_FAILED)
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
  authenticateUser,
  withNamespaces('Facebook')
)(Facebook)
