import React from 'react'
import { useTranslation } from 'i18n'
import { Base, Text } from './styles'

function Legal() {
  const { t } = useTranslation('legal')

  return (
    <Base>
      <Text>
        {t('DESCRIPTION')}
        <a href="/terms">{t('LINK')}</a>
      </Text>
    </Base>
  )
}

export default Legal
