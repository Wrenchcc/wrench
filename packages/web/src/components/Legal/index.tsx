import React from 'react'
import { useTranslation } from 'react-i18next'
import { Base, Text } from './styles'

function Legal() {
  const { t } = useTranslation()

  return (
    <Base>
      <Text>
        {t('Legal:description')}
        <a href="/terms">{t('Legal:link')}</a>
      </Text>
    </Base>
  )
}

export default Legal
