import React, { useCallback } from 'react'
import { Alert } from 'react-native'
import { useAuthenticateFacebookMutation } from '@wrench/common'
import { useMMKVString } from 'utils/storage'
import { setTokens } from 'utils/storage/auth'
import { AppNavigation } from 'navigation'
import { useTranslation } from 'react-i18next'
import { LoginManager, AccessToken } from 'react-native-fbsdk-next'
import { PREFFERED_SIGN_IN_PROVIDER } from 'utils/storage/constants'
import { SIGN_IN_PROVIDERS } from 'utils/enums'
import { getCurrentUser } from 'gql'
import { logError } from 'utils/sentry'
import { Touchable, Text, Icon } from 'ui'
import { facebook } from 'images'

const styles = {
  button: {
    width: '100%',
    backgroundColor: '#3b5998',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 13,
    paddingRight: 13,
    paddingBottom: 13,
    paddingLeft: 13,
    marginTop: 15,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    textAlign: 'center',
  },
}

function Facebook() {
  const { t } = useTranslation('facebook')
  const [authenticate] = useAuthenticateFacebookMutation()
  const [_, setProvider] = useMMKVString(PREFFERED_SIGN_IN_PROVIDER)

  const handleLoginManager = useCallback(async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])

      setProvider(SIGN_IN_PROVIDERS.FACEBOOK)

      if (result.isCancelled) {
        return
      }

      const facebookResponse = await AccessToken.getCurrentAccessToken()
      await authenticate({
        variables: {
          token: facebookResponse.accessToken,
        },
        update: async (_, { data }) => {
          const { access_token, refresh_token } = data.authenticateFacebook
          await setTokens(access_token, refresh_token)
        },
      })

      const { data } = await getCurrentUser()

      if (data.user) {
        await AppNavigation(!data.user.interestedIn)
      }
    } catch (err) {
      Alert.alert('Error', `We're sorry, but something went wrong. Please try again.`, [
        {
          text: 'Dismiss',
          style: 'cancel',
        },
      ])
      logError(err)
    }
  }, [])

  return (
    <Touchable style={styles.button} onPress={handleLoginManager}>
      <Icon source={facebook} style={styles.icon} color="white" />
      <Text color="white" medium fontSize={16} style={styles.text}>
        {t('button')}
      </Text>
    </Touchable>
  )
}

export default Facebook
