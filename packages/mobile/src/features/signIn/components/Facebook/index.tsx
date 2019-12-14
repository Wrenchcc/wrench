import React, { useCallback, useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { AppNavigation } from 'navigation'
import { useTranslation } from 'react-i18next'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { PREFFERED_SIGN_IN_PROVIDER } from 'utils/storage/constants'
import { SIGN_IN_PROVIDERS } from 'utils/enums'
import { getCurrentUser } from 'services/gql'
import { track, events } from 'utils/analytics'
import { logError } from 'utils/sentry'
import { authenticateFacebook } from 'services/graphql/mutations/user/authenticateFacebook'
import { Icon } from 'ui'
import { facebook } from 'images'
import { Button, Text, Loader } from './styles'

function Facebook({ authenticateFacebook: authenticateFacebookMutation }) {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  const handleLoginManager = useCallback(async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])
      setIsLoading(true)

      AsyncStorage.setItem(PREFFERED_SIGN_IN_PROVIDER, SIGN_IN_PROVIDERS.FACEBOOK)

      if (result.isCancelled) {
        setIsLoading(false)
        return
      }

      const facebookResponse = await AccessToken.getCurrentAccessToken()
      await authenticateFacebookMutation(facebookResponse.accessToken)

      track(events.USER_SIGNED_IN_FACEBOOK_SUCCESSFULL)
      const { data } = await getCurrentUser()

      if (data.user) {
        AppNavigation(!data.user.interestedIn)
      }
    } catch (err) {
      setIsLoading(false)
      track(events.USER_SIGNED_IN_FACEBOOK_FAILED)
      logError(err)
    }
  }, [])

  return (
    <Button onPress={handleLoginManager}>
      <Icon source={facebook} style={{ marginRight: 10 }} color="white" />
      <Text white medium>
        {t('Facebook:button')}
      </Text>
      {isLoading && <Loader color="white" />}
    </Button>
  )
}

export default authenticateFacebook(Facebook)
