// @ts-nocheck
import React from 'react'
import { useTranslation } from 'react-i18next'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Text } from 'ui'

const generateShareableUrl = url => [
  {
    provider: 'facebook',
    url: `https://www.facebook.com/sharer/sharer.php?app_id=1174076712654826&u=${url}`,
    style: {
      marginLeft: 5,
      width: 14,
    },
  },
  {
    provider: 'messenger',
    url: `https://www.facebook.com/dialog/send?app_id=1174076712654826&link=${url}`,
    style: {
      width: 23,
    },
  },
  // {
  //   provider: 'twitter',
  //   url: 'katt',
  // },
  {
    provider: 'email',
    url: `mailto:?subject=See this Wrench project&body=See this Wrench project ${url}`,
    style: {
      width: 23,
    },
  },
  {
    provider: 'copy',
    url,
    style: {
      width: 23,
    },
  },
  {
    provider: 'cancel',
    cancel: true,
  },
]

function Share({ closeModal, dynamicLink }) {
  const { t } = useTranslation()
  const providers = generateShareableUrl(dynamicLink)

  const renderComponent = ({ provider, url, closeModal }) => {
    switch (provider) {
      case 'cancel':
        return (
          <span style={{ cursor: 'pointer' }} onClick={closeModal}>
            {t(`Share:${provider}`)}
          </span>
        )
      case 'copy':
        return (
          <CopyToClipboard text={url} onCopy={closeModal} style={{ cursor: 'pointer' }}>
            <span>{t(`Share:${provider}`)}</span>
          </CopyToClipboard>
        )
      default:
        return <a href={url}>{t(`Share:${provider}`)}</a>
    }
  }

  return providers.map(({ provider, cancel, url, style }) => {
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
            <img style={{ height: 'auto', ...style }} src={require(`./${provider}.svg`)} />
          </div>
        )}
        <Text medium>{renderComponent({ provider, url, closeModal })}</Text>
      </div>
    )
  })
}

export default Share
