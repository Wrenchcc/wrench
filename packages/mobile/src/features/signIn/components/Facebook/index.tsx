import React, { useCallback, useState } from 'react'
import { AppNavigation } from 'navigation'
import { useTranslation } from 'react-i18next'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { getCurrentUser } from 'gql'
import { track, events } from 'utils/analytics'
import { logError } from 'utils/sentry'
import { authenticateFacebook } from 'graphql/mutations/user/authenticateFacebook'
import { Button, Text, Loader } from './styled'

function Facebook({ authenticateFacebook: authenticateFacebookMutation }) {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  const handleLoginManager = useCallback(async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])
      setIsLoading(true)

      if (result.isCancelled) {
        setIsLoading(false)
        return
      }

      const facebookResponse = await AccessToken.getCurrentAccessToken()
      await authenticateFacebookMutation(facebookResponse.accessToken)

      track(events.USER_SIGNED_IN_FACEBOOK_SUCCESSFULL)
      const { data } = await getCurrentUser()

      if (data.user) {
        AppNavigation(!data.user.interestedIn)
      }
    } catch (err) {
      setIsLoading(false)
      track(events.USER_SIGNED_IN_FACEBOOK_FAILED)
      logError(err)
    }
  }, [])

  return (
    <Button onPress={handleLoginManager}>
      <Text white medium>
        {t('Facebook:button')}
      </Text>
      {isLoading && <Loader color="white" />}
    </Button>
  )
}

export default authenticateFacebook(Facebook)
