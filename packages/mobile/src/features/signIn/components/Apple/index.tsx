import React, { useCallback } from 'react'
import { AppNavigation } from 'navigation'
import AsyncStorage from '@react-native-community/async-storage'
import * as AppleAuthentication from 'react-native-apple-authentication'
import { pathOr } from 'ramda'
import { PREFFERED_SIGN_IN_PROVIDER } from 'utils/storage/constants'
import { SIGN_IN_PROVIDERS } from 'utils/enums'
import { getCurrentUser } from 'gql'
import { authenticateApple } from 'graphql/mutations/user/authenticateApple'
import { track, events } from 'utils/analytics'
import { logError } from 'utils/sentry'

function Apple({ authenticateApple: authenticateAppleMutation, border }) {
  const handleLoginManager = useCallback(async () => {
    try {
      const appleResponse = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      })

      console.log(appleResponse)

      AsyncStorage.setItem(PREFFERED_SIGN_IN_PROVIDER, SIGN_IN_PROVIDERS.APPLE)

      await authenticateAppleMutation(appleResponse.identityToken, {
        firstName: pathOr(null, ['fullName', 'givenName']),
        lastName: pathOr(null, ['fullName', 'familyName']),
      })

      track(events.USER_SIGNED_IN_APPLE_SUCCESSFULL)
      const { data } = await getCurrentUser()

      if (data.user) {
        AppNavigation(!data.user.interestedIn)
      }
    } catch (err) {
      track(events.USER_SIGNED_IN_APPLE_FAILED)
      logError(err)
    }
  }, [])

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
      buttonStyle={
        border
          ? AppleAuthentication.AppleAuthenticationButtonStyle.WHITE_OUTLINE
          : AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
      }
      cornerRadius={0}
      style={{ height: 55, width: '100%', marginBottom: 20 }}
      onPress={handleLoginManager}
    />
  )
}

export default authenticateApple(Apple)
