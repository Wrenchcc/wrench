import React, { useCallback } from 'react'
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
import { Icon } from 'ui'
import { facebook } from 'images'
import { Button, Text } from './styles'

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
      logError(err)
    }
  }, [])

  return (
    <Button onPress={handleLoginManager}>
      <Icon source={facebook} style={{ marginRight: 10 }} color="white" />
      <Text white medium fontSize={16}>
        {t('button')}
      </Text>
    </Button>
  )
}

export default Facebook
