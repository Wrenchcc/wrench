import React, { useCallback, useState, useEffect } from 'react'
import { AppNavigation } from 'navigation'
import AsyncStorage from '@react-native-community/async-storage'
import * as AppleAuthentication from 'react-native-apple-authentication'
import { useTranslation } from 'react-i18next'
import { PREFFERED_SIGN_IN_PROVIDER } from 'utils/storage/constants'
import { SIGN_IN_PROVIDERS } from 'utils/enums'
import { getCurrentUser } from 'gql'
import { authenticateApple } from 'graphql/mutations/user/authenticateApple'
import { track, events } from 'utils/analytics'
import { logError } from 'utils/sentry'

async function signInAsync() {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    })

    console.log(credential)
  } catch (e) {
    console.log(e)
  }
}

function Apple({ authenticateApple: authenticateAppleMutation, border }) {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  const handleLoginManager = useCallback(async () => {
    try {
      AppleAuthentication.signInAsync()
      AsyncStorage.setItem(PREFFERED_SIGN_IN_PROVIDER, SIGN_IN_PROVIDERS.APPLE)

      setIsLoading(true)

      // const userInfo = await AppleSignin.signIn()

      // await authenticateAppleMutation(userInfo.idToken, userInfo.serverAuthCode)

      track(events.USER_SIGNED_IN_APPLE_SUCCESSFULL)
      // const { data } = await getCurrentUser()

      // if (data.user) {
      //   AppNavigation(!data.user.interestedIn)
      // }
    } catch (err) {
      setIsLoading(false)
      track(events.USER_SIGNED_IN_APPLE_FAILED)
      logError(err)
    }
  }, [])

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE_OUTLINE}
      cornerRadius={0}
      style={{ height: 55, width: '100%', marginBottom: 20 }}
      onPress={signInAsync}
    />
  )
}

export default authenticateApple(Apple)
