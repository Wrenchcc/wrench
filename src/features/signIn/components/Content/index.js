import React from 'react'
import withLocalization from 'i18n/withLocalization'
import { Base, Headline, Description } from './styles'

const Content = ({ t }) => (
  <Base>
    <Headline color="white" medium>
      {t('.headline')}
    </Headline>
    <Description color="white" opacity={0.8}>
      {t('.description')}
    </Description>
  </Base>
)

export default withLocalization(Content, 'OnboardingContent')
