import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import { Base, Text, Link } from './styles'

const URL = 'https://wrench.cc/terms'

function Legal() {
  const { t } = useTranslation()
  const { showModal } = useNavigation()

  return (
    <Base>
      <Text>{t('Legal:description')}</Text>
      <Link onPress={() => showModal(SCREENS.WEBVIEW, { url: URL })}>
        <Text underline>{t('Legal:link')}</Text>
      </Link>
    </Base>
  )
}

export default Legal
