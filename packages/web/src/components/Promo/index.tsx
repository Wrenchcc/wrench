// @ts-nocheck
import React, { useState } from 'react'
import { useTranslation } from 'i18n'
import { useSendPromoMutation } from '@wrench/common'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { Text, Loader } from 'ui'
import { useCookie, Cookies } from 'hooks'
import { Base, LogoRoundedIcon, Description, Bottom, Send, CloseIcon, Placeholder } from './styles'

const ReactPhoneInput = dynamic(import('react-phone-input-2'), {
  ssr: false,
  loading: () => (
    <Placeholder>
      <Loader />
    </Placeholder>
  ),
})

function Promo({ viewerCountry, sticky = true, inverted = false, paddingHorizontal, inline }) {
  const { t } = useTranslation('promo')
  const [hide, setHidden] = useState(false)
  const [number, setNumber] = useState('')
  const [success, setSuccess] = useState(false)
  const [sendPromo] = useSendPromoMutation()
  const [, setValue] = useCookie(Cookies.SHOW_PROMO)
  const router = useRouter()

  if (sticky && router.pathname === '/download') {
    return null
  }

  const hidePromo = () => {
    setHidden(true)
    setValue(false)
  }

  return (
    !hide && (
      <Base
        sticky={sticky}
        inverted={inverted}
        paddingHorizontal={paddingHorizontal}
        inline={inline}
      >
        <LogoRoundedIcon inverted={inverted} width="40" height="40"/> 

        {!inverted && (
          <CloseIcon width={13} height={13} onClick={hidePromo} />
        )}

        <Text medium fontSize={19} color={inverted && 'white'}>
          {t('title')}
        </Text>

        <Description color="neutral" fontSize={15}>
          {t('description')}
        </Description>

        <Bottom inverted={inverted}>
          <ReactPhoneInput
            country={viewerCountry && viewerCountry.toLowerCase()}
            disableDropdown
            onChange={val => setNumber(val)}
            value={number}
            specialLabel=""
          />
          <Send
            inverted={inverted}
            success={success}
            active={number.length >= 10}
            onClick={() =>
              number &&
              sendPromo({
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
            {success ? t('button_success') : t('button_default')}
          </Send>
        </Bottom>
      </Base>
    )
  )
}

export default Promo
