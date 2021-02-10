import React, { useCallback, useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { useAuthenticateFacebookMutation } from '@wrench/common'
import { setTokens } from 'utils/storage/auth'
import { AppNavigation } from 'navigation'
import { useTranslation } from 'react-i18next'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { PREFFERED_SIGN_IN_PROVIDER } from 'utils/storage/constants'
import { SIGN_IN_PROVIDERS } from 'utils/enums'
import { getCurrentUser } from 'gql'
import { logError } from 'utils/sentry'
import { Icon } from 'ui'
import { facebook } from 'images'
import { Button, Text, Loader } from './styles'

function Facebook() {
  const { t } = useTranslation('facebook')
  const [isLoading, setIsLoading] = useState(false)
  const [authenticate] = useAuthenticateFacebookMutation()

  const handleLoginManager = useCallback(async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])
      setIsLoading(true)

      AsyncStorage.setItem(PREFFERED_SIGN_IN_PROVIDER, SIGN_IN_PROVIDERS.FACEBOOK)

      if (result.isCancelled) {
        setIsLoading(false)
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
      setIsLoading(false)
      logError(err)
    }
  }, [])

  return (
    <Button onPress={handleLoginManager}>
      <Icon source={facebook} style={{ marginRight: 10 }} color="white" />
      <Text white medium>
        {t('button')}
      </Text>
      {isLoading && <Loader color="white" />}
    </Button>
  )
}

export default Facebook
