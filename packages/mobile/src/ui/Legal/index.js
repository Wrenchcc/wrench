import React, { memo } from 'react'
import withTranslation from 'i18n/withTranslation'
import { navigateToWebView } from 'navigation/actions'
import { Base, Text, Link } from './styles'

const LEGAL_URL = 'https://beta.wrench.cc/terms'

const Legal = memo(function Legal({ t, ...props }) {
  return (
    <Base {...props}>
      <Text>{t('Legal:description')}</Text>
      <Link onPress={() => navigateToWebView({ url: LEGAL_URL })}>
        <Text underline>{t('Legal:link')}</Text>
      </Link>
    </Base>
  )
})

export default withTranslation('Legal')(Legal)
