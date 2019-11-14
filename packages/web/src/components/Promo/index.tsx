// @ts-nocheck
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/react-hooks'
import dynamic from 'next/dynamic'
import { Text, Loader } from 'ui'
import { SEND_PROMO } from 'graphql/mutations/invite/sendPromo'
import { Base, Icon, Description, Bottom, Send, Close, Placeholder } from './styles'

const ReactPhoneInput = dynamic(import('react-phone-input-2'), {
  ssr: false,
  loading: () => (
    <Placeholder>
      <Loader />
    </Placeholder>
  ),
})

function Promo({ viewerCountry = 'us', sticky = true, inverted = false, paddingHorizontal }) {
  const { t } = useTranslation()
  const [hide, setHidden] = useState(false)
  const [number, setNumber] = useState('')
  const [success, setSuccess] = useState(false)
  const handleSubmit = useMutation(SEND_PROMO)

  const hidePromo = () => {
    setHidden(true)
    document.cookie = 'show-promo-banner=false'
  }

  return (
    !hide && (
      <Base sticky={sticky} inverted={inverted} paddingHorizontal={paddingHorizontal}>
        <Icon src={inverted ? require('./icon-white.svg') : require('./icon.svg')} />

        {!inverted && (
          <Close src={require('./close.svg')} width={13} height={13} onClick={hidePromo} />
        )}

        <Text medium fontSize={19} color={inverted ? 'white' : 'black'}>
          {t('Promo:title')}
        </Text>

        <Description color="grey" fontSize={15}>
          {t('Promo:description')}
        </Description>

        <Bottom inverted={inverted}>
          <ReactPhoneInput
            defaultCountry={viewerCountry.toLowerCase()}
            disableDropdown
            onChange={val => setNumber(val)}
            value={number}
          />
          <Send
            inverted={inverted}
            success={success}
            active={number.length >= 10}
            onClick={() =>
              number &&
              handleSubmit({
                update: (_, { data }) => {
                  if (data.sendPromo) {
                    setSuccess(true)
                    setNumber('')
                    setTimeout(() => setSuccess(false), 3500)
                  }
                },
                variables: {
                  number: number.replace(/\D+/g, ''),
                },
              })
            }
          >
            {success ? t('Promo:button.success') : t('Promo:button.default')}
          </Send>
        </Bottom>
      </Base>
    )
  )
}

export default Promo
