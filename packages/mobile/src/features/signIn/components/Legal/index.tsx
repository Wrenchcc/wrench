import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { showModal, SCREENS } from 'navigation'
import { Base, Text, Link } from './styles'

const LEGAL_URL = 'https://beta.wrench.cc/terms'

function Legal() {
  const { t } = useTranslation()

  const handleNavigation = useCallback(
    () =>
      showModal(SCREENS.WEBVIEW, {
        options: {
          statusBar: {
            style: 'dark',
          },
        },
        url: LEGAL_URL,
      }),
    []
  )

  return (
    <Base>
      <Text>{t('Legal:description')}</Text>
      <Link onPress={handleNavigation}>
        <Text underline>{t('Legal:link')}</Text>
      </Link>
    </Base>
  )
}

export default Legal
