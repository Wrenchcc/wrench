import React, { useCallback, useState } from 'react'
import { useAuthenticateAppleMutation } from '@wrench/common'
import { AppNavigation } from 'navigation'
import { useTranslation } from 'react-i18next'
import AsyncStorage from '@react-native-community/async-storage'
import * as AppleAuthentication from '@pontusab/react-native-apple-authentication'
import { pathOr } from 'rambda'
import { PREFFERED_SIGN_IN_PROVIDER } from 'utils/storage/constants'
import { SIGN_IN_PROVIDERS } from 'utils/enums'
import { getCurrentUser } from 'services/gql'
import { logError } from 'utils/sentry'
import { setTokens } from 'utils/storage/auth'
import { Icon } from 'ui'
import { apple } from 'images'
import { Button, Text, Loader } from './styles'

function Apple({ border }) {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [authenticate] = useAuthenticateAppleMutation()

  const handleLoginManager = useCallback(async () => {
    try {
      const appleResponse = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      })

      setIsLoading(true)

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
      setIsLoading(false)
      logError(err)
    }
  }, [])

  return (
    <Button onPress={handleLoginManager} border={border}>
      <Icon source={apple} style={{ marginRight: 10, marginTop: -3 }} />
      <Text white medium>
        {t('Apple:button')}
      </Text>
      {isLoading && <Loader color="black" />}
    </Button>
  )
}

export default Apple
