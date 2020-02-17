import React from 'react'
import { useTranslation } from 'react-i18next'
import { Base, Headline, Description } from './styles'

function Content() {
  const { t } = useTranslation()

  return (
    <Base>
      <Headline medium>{t('OnboardingContent:headline')}</Headline>
      <Description opacity={0.8}>{t('OnboardingContent:description')}</Description>
    </Base>
  )
}

export default Content
