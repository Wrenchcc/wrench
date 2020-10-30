// @ts-nocheck
import React from 'react'
import { EmailIcon, FacebookIcon, MessengerIcon, CopyIcon } from '@wrench/ui'
import { useTranslation } from 'i18n'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Text, Icon } from 'ui'

const generateShareableUrl = (url) => [
  {
    provider: 'facebook',
    url: `https://www.facebook.com/sharer/sharer.php?app_id=1174076712654826&u=${url}`,
    Icon: FacebookIcon,
    style: {
      width: 23,
    },
  },
  {
    provider: 'messenger',
    url: `https://www.facebook.com/dialog/send?app_id=1174076712654826&link=${url}`,
    Icon: MessengerIcon,
    style: {
      width: 23,
    },
  },
  {
    provider: 'email',
    url: `mailto:?subject=See this Wrench project&body=See this Wrench project ${url}`,
    Icon: EmailIcon,
    style: {
      width: 22,
    },
  },
  {
    provider: 'copy',
    url,
    Icon: CopyIcon,
    style: {
      width: 22,
    },
  },
  {
    provider: 'cancel',
    cancel: true,
  },
]

function Share({ closeModal, dynamicLink }) {
  const { t } = useTranslation('share')
  const providers = generateShareableUrl(dynamicLink)

  const renderComponent = ({ provider, url, closeModal }) => {
    switch (provider) {
      case 'cancel':
        return (
          <span style={{ cursor: 'pointer' }} onClick={closeModal}>
            {t(provider)}
          </span>
        )
      case 'copy':
        return (
          <CopyToClipboard text={url} onCopy={closeModal} style={{ cursor: 'pointer' }}>
            <span>{t(provider)}</span>
          </CopyToClipboard>
        )
      default:
        return <a href={url}>{t(provider)}</a>
    }
  }

  return providers.map(({ provider, cancel, url, style, Icon }) => {
    return (
      <div
        key={provider}
        style={{
          display: 'flex',
          marginBottom: cancel ? 0 : 25,
          marginTop: cancel ? 25 : 0,
          marginLeft: cancel ? 38 : 0,
        }}
      >
        {!cancel && (
          <div style={{ width: 24, marginRight: 15 }}>
            <Icon style={{ height: 'auto', ...style }} />
          </div>
        )}
        <Text medium>{renderComponent({ provider, url, closeModal })}</Text>
      </div>
    )
  })
}

export default Share
