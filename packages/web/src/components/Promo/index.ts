import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import dynamic from 'next/dynamic'
import { Text } from '../../ui'
import { Base, Icon, Bottom, Send, Close } from './styles'

const ReactPhoneInput = dynamic(import('react-phone-input-2'), {
  ssr: false,
})

function Promo() {
  const { t } = useTranslation()
  const [value, setValue] = useState('')

  return (
    <Base>
      <Icon src={require('./icon.svg')} />
      <Close src={require('./close.svg')} width={13} height={13} />
      <Text medium fontSize={19}>
        {t('Promo:title')}
      </Text>
      <Text color="grey" fontSize={15}>
        {t('Promo:description')}
      </Text>

      <Bottom>
        <ReactPhoneInput defaultCountry="us" disableDropdown onChange={setValue} value={value} />
        <Send>{t('Promo:button')}</Send>
      </Bottom>
    </Base>
  )
}

export default Promo
