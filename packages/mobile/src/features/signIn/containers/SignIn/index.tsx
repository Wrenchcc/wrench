import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Image, useColorScheme } from 'react-native'
import * as AppleAuthentication from 'expo-apple-authentication'
import { Video } from 'expo-av'
import { useMMKVString } from 'utils/storage'
import { DARK_THEME, LIGHT_THEME } from '@wrench/ui'
import { useNavigation, SCREENS, STATUS_BAR, NAVIGATION } from 'navigation'
import { logo } from 'images'
import { Text, Title, Touchable } from 'ui'
import { isIphone, isAndroid } from 'utils/platform'
import { PREFFERED_SIGN_IN_PROVIDER } from 'utils/storage/constants'
import { SIGN_IN_PROVIDERS } from 'utils/enums'
import { logError } from 'utils/sentry'
import * as Spacing from 'ui/Spacing'
import video from 'videos/background.mp4'
import Apple from '../../components/Apple'
import Facebook from '../../components/Facebook'
import Google from '../../components/Google'
import Legal from '../../components/Legal'

const styles = {
  base: {
    flex: 1,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    backgroundColor: 'rgba(000, 000, 000, 0.6)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  inner: {
    flex: 1,
    paddingTop: isAndroid ? NAVIGATION.STATUS_BAR_HEIGHT + 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    paddingTop: 30,
    lineHeight: 30,
  },
}

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
  const [savedProvider] = useMMKVString(PREFFERED_SIGN_IN_PROVIDER)
  const [provider] = useState(savedProvider)
  const [isAvailable, setAvailable] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const colorScheme = useColorScheme()

  async function fetchPreferredSignInAsync() {
    try {
      const isAvailable = await AppleAuthentication.isAvailableAsync()

      setAvailable(isAvailable)
      setLoading(false)
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
    <View style={styles.base}>
      <Video source={video} isMuted resizeMode="cover" />
      <View style={styles.overlay} />
      <View style={styles.inner}>
        <Image source={logo} />

        <View style={styles.content}>
          <Title large numberOfLines={0} color="white">
            {t('Title')}
          </Title>
          <Text white fontSize={20} color="white" style={styles.description}>
            {t('description')}
          </Text>
        </View>

        {!isLoading && renderPreferredSignInProvider(provider, isAvailable)}

        <Spacing.Horizontally px={30} />

        <Touchable onPress={handleOtherOptions}>
          <Text color="white" medium center>
            {t('other')}
          </Text>
        </Touchable>

        <Spacing.Horizontally px={30} />

        <Legal />
      </View>
    </View>
  )
}

export default SignIn
