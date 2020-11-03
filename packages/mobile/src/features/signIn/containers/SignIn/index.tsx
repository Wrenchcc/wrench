import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useColorScheme } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import * as AppleAuthentication from 'expo-apple-authentication'
import { DARK_THEME, LIGHT_THEME } from '@wrench/ui'
import { useNavigation, SCREENS, STATUS_BAR } from 'navigation'
import { logo } from 'images'
import video from 'videos/background.mp4'
import { Text } from 'ui'
import { isIphone, isAndroid } from 'utils/platform'
import { PREFFERED_SIGN_IN_PROVIDER } from 'utils/storage/constants'
import { SIGN_IN_PROVIDERS } from 'utils/enums'
import { logError } from 'utils/sentry'
import Apple from '../../components/Apple'
import Facebook from '../../components/Facebook'
import Google from '../../components/Google'
import Legal from '../../components/Legal'
import {
  Base,
  Inner,
  Content,
  Video,
  Icon,
  Description,
  Headline,
  Overlay,
  Options,
} from './styles'

function renderPreferredSignInProvider(provider, isAppleAvailable) {
  switch (provider) {
    case SIGN_IN_PROVIDERS.APPLE: {
      return <Apple />
    }
    case SIGN_IN_PROVIDERS.FACEBOOK: {
      return <Facebook />
    }
    case SIGN_IN_PROVIDERS.GOOGLE: {
      return <Google />
    }
    default: {
      if (isIphone && isAppleAvailable) {
        return <Apple />
      } else if (isAndroid) {
        return <Google />
      } else {
        return <Facebook />
      }
    }
  }
}

function SignIn() {
  const { t } = useTranslation('sign-in')
  const { showModal } = useNavigation()
  const [provider, setProvider] = useState()
  const [isAvailable, setAvailable] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const colorScheme = useColorScheme()

  async function fetchPreferredSignInAsync() {
    try {
      const [provider, isAvailable] = await Promise.all([
        AsyncStorage.getItem(PREFFERED_SIGN_IN_PROVIDER),
        AppleAuthentication.isAvailableAsync(),
      ])

      setAvailable(isAvailable)
      setLoading(false)

      if (provider) {
        setProvider(provider)
      }
    } catch (err) {
      setLoading(false)
      logError(err)
    }
  }

  useEffect(() => {
    fetchPreferredSignInAsync()
  }, [])

  const handleOtherOptions = useCallback(() => {
    showModal(SCREENS.OTHER_SIGN_IN_OPTIONS, {
      options: {
        statusBar: {
          style: colorScheme === 'dark' ? STATUS_BAR.LIGHT : STATUS_BAR.DARK,
          drawBehind: true,
        },
        layout: {
          componentBackgroundColor:
            colorScheme === 'dark' ? DARK_THEME.default : LIGHT_THEME.default,
        },
      },
    })
  }, [showModal])

  return (
    <Base>
      <Video source={video} muted disableFocus resizeMode="cover" />
      <Overlay />
      <Inner>
        <Icon source={logo} />

        <Content>
          <Headline large numberOfLines={0}>
            {t('headline')}
          </Headline>
          <Description white fontSize={20}>
            {t('description')}
          </Description>
        </Content>

        {!isLoading && renderPreferredSignInProvider(provider, isAvailable)}

        <Options onPress={handleOtherOptions}>
          <Text color="white" medium center>
            {t('other')}
          </Text>
        </Options>

        <Legal />
      </Inner>
    </Base>
  )
}

export default SignIn
