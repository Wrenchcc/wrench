import React, { useCallback, useState } from 'react'
import { AppNavigation } from 'navigation'
import { useTranslation } from 'react-i18next'
import { GoogleSignin, statusCodes } from 'react-native-google-signin'
import { getCurrentUser } from 'gql'
import { authenticateGoogle } from 'graphql/mutations/user/authenticateGoogle'
import { track, events } from 'utils/analytics'
import { logError } from 'utils/sentry'
import { Button, Text, Loader } from './styles'

function Google({ authenticateGoogle: authenticateGoogleMutation }) {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  const handleLoginManager = useCallback(async () => {
    try {
      GoogleSignin.configure({
        offlineAccess: true,
        webClientId: '407610377102-i51cefcjclotos2673d09cbncl1mo02f.apps.googleusercontent.com',
      })

      setIsLoading(true)

      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()

      await authenticateGoogleMutation(userInfo.idToken, userInfo.serverAuthCode)

      track(events.USER_SIGNED_IN_GOOGLE_SUCCESSFULL)
      const { data } = await getCurrentUser()

      if (data.user) {
        AppNavigation(!data.user.interestedIn)
      }
    } catch (err) {
      setIsLoading(false)
      track(events.USER_SIGNED_IN_GOOGLE_FAILED)
      logError(err)
    }
  }, [])

  return (
    <Button onPress={handleLoginManager}>
      <Text white medium>
        {t('Google:button')}
      </Text>
      {isLoading && <Loader color="black" />}
    </Button>
  )
}

export default authenticateGoogle(Google)
