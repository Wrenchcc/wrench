import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { showModal, SCREENS, STATUS_BAR } from 'navigation'
import { Touchable } from 'ui'
import { Base, Text } from './styles'

const LEGAL_URL = 'https://wrench.cc/terms'

function Legal() {
  const { t } = useTranslation()

  const handleNavigation = useCallback(
    () =>
      showModal(SCREENS.WEBVIEW, {
        options: {
          statusBar: {
            style: STATUS_BAR.DARK,
          },
        },
        url: LEGAL_URL,
      }),
    []
  )

  return (
    <Base>
      <Text>{t('Legal:description')}</Text>
      <Touchable onPress={handleNavigation}>
        <Text underline>{t('Legal:link')}</Text>
      </Touchable>
    </Base>
  )
}

export default Legal
