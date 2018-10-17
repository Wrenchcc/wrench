import React from 'react'
import { withNamespaces } from 'react-i18next'
import { Base, Headline, Description } from './styles'

function Content({ t }) {
  return (
    <Base>
      <Headline color="white" medium>
        {t('OnboardingContent:headline')}
      </Headline>
      <Description color="white" opacity={0.8}>
        {t('OnboardingContent:description')}
      </Description>
    </Base>
  )
}

export default withNamespaces('OnboardingContent')(Content)
