import React from 'react'
import { useTranslation } from 'i18n'
import { Base, Text } from './styles'

function Legal() {
  const { t } = useTranslation('Legal')

  return (
    <Base>
      <Text>
        {t('description')}
        <a href="/terms">{t('link')}</a>
      </Text>
    </Base>
  )
}

export default Legal
