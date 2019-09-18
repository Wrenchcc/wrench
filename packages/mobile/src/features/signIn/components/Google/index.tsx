import React, { useCallback, useState } from 'react'
import { AppNavigation } from 'navigation'
import { useTranslation } from 'react-i18next'
import { GoogleSignin } from 'react-native-google-signin'
import AsyncStorage from '@react-native-community/async-storage'
import { PREFFERED_SIGN_IN_PROVIDER } from 'utils/storage/constants'
import { SIGN_IN_PROVIDERS } from 'utils/enums'
import { getCurrentUser } from 'gql'
import { authenticateGoogle } from 'graphql/mutations/user/authenticateGoogle'
import { track, events } from 'utils/analytics'
import { logError } from 'utils/sentry'
import { Button, Text, Loader } from './styles'

function Google({ authenticateGoogle: authenticateGoogleMutation, border }) {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  const handleLoginManager = useCallback(async () => {
    try {
      GoogleSignin.configure({
        offlineAccess: true,
        webClientId: '407610377102-i51cefcjclotos2673d09cbncl1mo02f.apps.googleusercontent.com',
      })

      setIsLoading(true)

      AsyncStorage.setItem(PREFFERED_SIGN_IN_PROVIDER, SIGN_IN_PROVIDERS.GOOGLE)

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
    <Button onPress={handleLoginManager} border={border}>
      <Text white medium>
        {t('Google:button')}
      </Text>
      {isLoading && <Loader color="black" />}
    </Button>
  )
}

export default authenticateGoogle(Google)
