import React, { useCallback, useState } from 'react'
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
import { Button, Text, Loader } from './styles'

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
    <Button onPress={handleLoginManager} border={border}>
      <Text white medium>
        {t('Apple:button')}
      </Text>
      {isLoading && <Loader color="black" />}
    </Button>
  )
}

export default authenticateApple(Apple)
