import React, { useCallback } from 'react'
import { AppNavigation } from 'navigation'
import { useTranslation } from 'react-i18next'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { track, events } from 'utils/analytics'
import { logError } from 'utils/sentry'
import { authenticateFacebook } from 'graphql/mutations/user/authenticateFacebook'
import { Button, Text } from './styled'

function Facebook({ authenticateFacebook }) {
  const { t } = useTranslation()

  const handleLoginManager = useCallback(async () => {
    try {
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email'])

      if (result.isCancelled) {
        return
      }

      const facebookResponse = await AccessToken.getCurrentAccessToken()
      await authenticateFacebook(facebookResponse.accessToken)

      track(events.USER_SIGNED_IN_FACEBOOK_SUCCESSFULL)

      AppNavigation()
    } catch (err) {
      track(events.USER_SIGNED_IN_FACEBOOK_FAILED)
      logError(err)
    }
  }, [])

  return (
    <Button onPress={handleLoginManager}>
      <Text white medium>
        {t('Facebook:button')}
      </Text>
    </Button>
  )
}

export default authenticateFacebook(Facebook)
