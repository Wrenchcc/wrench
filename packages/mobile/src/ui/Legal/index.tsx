import React, { useCallback } from 'react'
import withTranslation from 'i18n/withTranslation'
import { showModal, SCREENS } from 'navigation'
import { Base, Text, Link } from './styles'

const LEGAL_URL = 'https://beta.wrench.cc/terms'

function Legal({ t, ...props }) {
  const handleNavigation = useCallback(
    () => showModal(SCREENS.WEBVIEW, {
      url: LEGAL_URL,
    }),
    []
  )

  return (
    <Base {...props}>
      <Text>{t('Legal:description')}</Text>
      <Link onPress={handleNavigation}>
        <Text underline>{t('Legal:link')}</Text>
      </Link>
    </Base>
  )
}

export default withTranslation('Legal')(Legal)
