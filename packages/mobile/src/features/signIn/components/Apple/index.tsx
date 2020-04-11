import React, { useCallback } from 'react'
import { useColorScheme } from 'react-native-appearance'
import { useAuthenticateAppleMutation } from '@wrench/common'
import { AppNavigation } from 'navigation'
import AsyncStorage from '@react-native-community/async-storage'
import * as AppleAuthentication from 'expo-apple-authentication'
import { pathOr } from 'rambda'
import { PREFFERED_SIGN_IN_PROVIDER } from 'utils/storage/constants'
import { SIGN_IN_PROVIDERS } from 'utils/enums'
import { getCurrentUser } from 'gql'
import { logError } from 'utils/sentry'
import { setTokens } from 'utils/storage/auth'

function Apple({ black }) {
  const [authenticate] = useAuthenticateAppleMutation()
  const colorScheme = useColorScheme()

  const handleLoginManager = useCallback(async () => {
    try {
      const appleResponse = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      })

      AsyncStorage.setItem(PREFFERED_SIGN_IN_PROVIDER, SIGN_IN_PROVIDERS.APPLE)

      await authenticate({
        variables: {
          identityToken: appleResponse.identityToken,
          user: {
            firstName: pathOr(null, ['fullName', 'givenName'], appleResponse),
            lastName: pathOr(null, ['fullName', 'familyName'], appleResponse),
          },
        },
        update: async (_, { data }) => {
          const { access_token, refresh_token } = data.authenticateApple
          await setTokens(access_token, refresh_token)
        },
      })

      const { data } = await getCurrentUser()

      if (data.user) {
        AppNavigation(!data.user.interestedIn)
      }
    } catch (err) {
      logError(err)
    }
  }, [])

  const buttonStyle =
    colorScheme === 'dark'
      ? AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
      : black
      ? AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
      : AppleAuthentication.AppleAuthenticationButtonStyle.WHITE

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={buttonStyle}
      cornerRadius={0}
      style={{ height: 46, width: '100%', marginBottom: 20 }}
      onPress={handleLoginManager}
    />
  )
}

export default Apple
