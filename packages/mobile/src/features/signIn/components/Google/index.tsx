import React, { useEffect, useCallback } from 'react'
import { Alert } from 'react-native'
import { AppNavigation } from 'navigation'
import { useAuthenticateGoogleMutation } from '@wrench/common'
import { setTokens } from 'utils/storage/auth'
import { useTranslation } from 'react-i18next'
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin'
import { useMMKVString } from 'utils/storage'
import { PREFFERED_SIGN_IN_PROVIDER } from 'utils/storage/constants'
import { SIGN_IN_PROVIDERS } from 'utils/enums'
import { getCurrentUser } from 'gql'
import { track, events } from 'utils/analytics'
import { Icon } from 'ui'
import { google } from 'images'
import { logError } from 'utils/sentry'
import { Button, Text } from './styles'

function Google({ border }) {
  const { t } = useTranslation('google')
  const [authenticate] = useAuthenticateGoogleMutation()
  const [_, setProvider] = useMMKVString(PREFFERED_SIGN_IN_PROVIDER)

  useEffect(() => {
    GoogleSignin.configure({
      offlineAccess: true,
      webClientId: '407610377102-dsuursv0qn83s4v2vnqfevm511ujp81t.apps.googleusercontent.com',
    })
  }, [])

  const handleLoginManager = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()

      setProvider(SIGN_IN_PROVIDERS.GOOGLE)

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
        await AppNavigation(!data.user.interestedIn)
      }
    } catch (err) {
      switch (err.code) {
        case statusCodes.SIGN_IN_CANCELLED:
        case statusCodes.IN_PROGRESS:
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          return
        default:
          Alert.alert('Error', `We're sorry, but something went wrong. Please try again.`, [
            {
              text: 'Dismiss',
              style: 'cancel',
            },
          ])

          logError(err)
      }
    }
  }, [])

  return (
    <Button onPress={handleLoginManager} border={border}>
      <Icon source={google} style={{ marginRight: 10 }} color="black" />
      <Text medium color="black" fontSize={16}>
        {t('button')}
      </Text>
    </Button>
  )
}

export default Google
