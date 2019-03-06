import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-apollo-hooks'
import dynamic from 'next/dynamic'
import { Text, Loader } from '../../ui'
import { SEND_PROMO } from '../../graphql/mutations/invite/sendPromo'
import { Base, Icon, Description, Bottom, Send, Close, Placeholder } from './styles'

const ReactPhoneInput = dynamic(import('react-phone-input-2'), {
  ssr: false,
  loading: () => (
    <Placeholder>
      <Loader small />
    </Placeholder>
  ),
})

function Promo({ viewerCountry = 'us' }) {
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
      <Base>
        <Icon src={require('./icon.svg')} />
        <Close src={require('./close.svg')} width={13} height={13} onClick={hidePromo} />
        <Text medium fontSize={19}>
          {t('Promo:title')}
        </Text>
        <Description color="grey" fontSize={15}>
          {t('Promo:description')}
        </Description>

        <Bottom>
          <ReactPhoneInput
            defaultCountry={viewerCountry.toLowerCase()}
            disableDropdown
            onChange={val => setNumber(val)}
            value={number}
          />
          <Send
            success={success}
            active={number.length >= 10}
            onClick={() => number
              && handleSubmit({
                update: (proxy, { data, error }) => {
                  if (data.sendPromo) {
                    setSuccess(true)
                    setNumber('')
                  }
                },
                variables: {
                  number,
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
