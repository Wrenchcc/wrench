import React, { useCallback, useState } from 'react'
import { AppNavigation } from 'navigation'
import { useAuthenticateGoogleMutation } from '@wrench/common'
import { setTokens } from 'utils/storage/auth'
import { useTranslation } from 'react-i18next'
import { GoogleSignin } from 'react-native-google-signin'
import AsyncStorage from '@react-native-community/async-storage'
import { PREFFERED_SIGN_IN_PROVIDER } from 'utils/storage/constants'
import { SIGN_IN_PROVIDERS } from 'utils/enums'
import { getCurrentUser } from 'gql'
import { track, events } from 'utils/analytics'
import { Icon } from 'ui'
import { google } from 'images'
import { Button, Text, Loader } from './styles'

function Google({ border }) {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [authenticate] = useAuthenticateGoogleMutation()

  const handleLoginManager = useCallback(async () => {
    try {
      GoogleSignin.configure({
        offlineAccess: true,
        webClientId: '407610377102-dsuursv0qn83s4v2vnqfevm511ujp81t.apps.googleusercontent.com',
      })

      setIsLoading(true)

      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()

      AsyncStorage.setItem(PREFFERED_SIGN_IN_PROVIDER, SIGN_IN_PROVIDERS.GOOGLE)

      await authenticate({
        variables: {
          idToken: userInfo.idToken,
        },
        update: async (_, { data }) => {
          const { access_token, refresh_token } = data.authenticateGoogle
          await setTokens(access_token, refresh_token)
          track(events.USER_SIGNED_IN)
        },
      })

      track(events.USER_SIGNED_IN_GOOGLE_SUCCESSFULL)
      const { data } = await getCurrentUser()

      if (data.user) {
        AppNavigation(!data.user.interestedIn)
      }
    } catch {
      setIsLoading(false)
    }
  }, [])

  return (
    <Button onPress={handleLoginManager} border={border}>
      <Icon source={google} style={{ marginRight: 10 }} />
      <Text white medium>
        {t('Google:button')}
      </Text>
      {isLoading && <Loader color="black" />}
    </Button>
  )
}

export default Google
