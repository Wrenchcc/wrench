import React, { useCallback } from 'react'
import { View, useColorScheme } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS, STATUS_BAR } from 'navigation'
import { Touchable, Text } from 'ui'
import { COLORS } from 'ui/constants'

const LEGAL_URL = 'https://wrench.cc/terms'

const styles = {
  base: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  text: {
    opacity: 0.8,
    fontSize: 12,
  },
}

function Legal({ color = 'white' }) {
  const { t } = useTranslation('legal')
  const { showModal } = useNavigation()
  const colorScheme = useColorScheme()

  const handleNavigation = useCallback(
    () =>
      showModal(SCREENS.WEBVIEW, {
        options: {
          statusBar: {
            drawBehind: true,
            style: colorScheme === 'dark' ? STATUS_BAR.LIGHT : STATUS_BAR.DARK,
          },
          layout: {
            componentBackgroundColor: COLORS.WHITE,
          },
        },
        url: LEGAL_URL,
      }),
    []
  )

  return (
    <View style={styles.base}>
      <Text color={color}>{t('description')}</Text>
      <Touchable onPress={handleNavigation}>
        <Text underline color={color} style={styles.text}>
          {t('link')}
        </Text>
      </Touchable>
    </View>
  )
}

export default Legal
