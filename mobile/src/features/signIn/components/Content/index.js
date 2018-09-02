import React from 'react'
import { translate } from 'react-i18next'
import { Base, Headline, Description } from './styles'

const Content = ({ t }) => (
  <Base>
    <Headline color="white" medium>
      {t('OnboardingContent:headline')}
    </Headline>
    <Description color="white" opacity={0.8}>
      {t('OnboardingContent:description')}
    </Description>
  </Base>
)

export default translate('OnboardingContent')(Content)
