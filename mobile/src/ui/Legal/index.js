import React from 'react'
import withLocalization from 'i18n/withLocalization'
import { navigateToWebView } from 'navigation'
import { Base, Text, Link } from './styles'

const LEGAL_URL = 'https://wrench.cc/legal'

const Legal = ({ t, ...props }) => (
  <Base {...props}>
    <Text>{t('.description')}</Text>
    <Link onPress={() => navigateToWebView({ url: LEGAL_URL })}>
      <Text underline>{t('.link')}</Text>
    </Link>
  </Base>
)

export default withLocalization(Legal, 'Legal')
