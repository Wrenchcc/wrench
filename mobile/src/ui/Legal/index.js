import React from 'react'
import withLocalization from 'i18n/withLocalization'
import { navigateToWebView } from 'navigation'
import { Base, Text, Link } from './styles'

// TODO: Add global url
const Legal = ({ t, ...props }) => (
  <Base {...props}>
    <Text>{t('.description')}</Text>
    <Link onPress={() => navigateToWebView({ url: 'https://wrench.cc' })}>
      <Text underline>{t('.link')}</Text>
    </Link>
  </Base>
)

export default withLocalization(Legal, 'Legal')
