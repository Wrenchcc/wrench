import React from 'react'
import withLocalization from 'i18n/withLocalization'
import Text from 'ui/Text'
import openLink from 'utils/openLink'

// TODO: Change to user email
const ContactButton = ({ t }) => (
  <Text medium onPress={() => openLink('mailto:user@wrench.cc')}>
    {t('.contact')}
  </Text>
)

export default withLocalization(ContactButton, 'ContactButton')
