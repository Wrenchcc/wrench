import React from 'react'
import { useTranslation } from 'react-i18next'
import { Base, Headline, Description } from './styles'

function Content() {
  const { t } = useTranslation('onboarding')

  return (
    <Base>
      <Headline medium>{t('headline')}</Headline>
      <Description opacity={0.8}>{t('description')}</Description>
    </Base>
  )
}

export default Content
