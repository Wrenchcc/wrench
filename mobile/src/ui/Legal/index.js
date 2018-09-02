import React from 'react'
import { translate } from 'react-i18next'
import { navigateToWebView } from 'navigation'
import { Base, Text, Link } from './styles'

const LEGAL_URL = 'https://wrench.cc/legal'

const Legal = ({ t, ...props }) => (
  <Base {...props}>
    <Text>{t('Legal:description')}</Text>
    <Link onPress={() => navigateToWebView({ url: LEGAL_URL })}>
      <Text underline>{t('Legal:link')}</Text>
    </Link>
  </Base>
)

export default translate('Legal')(Legal)
