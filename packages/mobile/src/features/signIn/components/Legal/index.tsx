import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS, STATUS_BAR } from 'navigation'
import { Touchable } from 'ui'
import { Base, Text } from './styles'
import { COLORS } from 'ui/constants'

const LEGAL_URL = 'https://wrench.cc/terms'

function Legal({ color = 'white' }) {
  const { t } = useTranslation()
  const { showModal } = useNavigation()

  const handleNavigation = useCallback(
    () =>
      showModal(SCREENS.WEBVIEW, {
        options: {
          statusBar: {
            style: STATUS_BAR.DARK,
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
    <Base>
      <Text color={color}>{t('Legal:description')}</Text>
      <Touchable onPress={handleNavigation}>
        <Text underline color={color}>
          {t('Legal:link')}
        </Text>
      </Touchable>
    </Base>
  )
}

export default Legal
