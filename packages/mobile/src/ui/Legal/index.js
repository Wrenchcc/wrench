import React, { memo } from 'react'
import { withNamespaces } from 'react-i18next'
import { navigateToWebView } from 'navigation/actions'
import { Base, Text, Link } from './styles'

const LEGAL_URL = 'https://wrench.cc/legal'

const Legal = memo(({ t, ...props }) => (
  <Base {...props}>
    <Text>{t('Legal:description')}</Text>
    <Link onPress={() => navigateToWebView({ url: LEGAL_URL })}>
      <Text underline>{t('Legal:link')}</Text>
    </Link>
  </Base>
))

export default withNamespaces('Legal')(Legal)
