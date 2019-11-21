// @ts-nocheck
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Text } from 'ui'

const generateShareableUrl = url => [
  {
    provider: 'facebook',
    url: `https://www.facebook.com/sharer/sharer.php?app_id=1174076712654826&u=${url}`,
  },
  {
    provider: 'messenger',
    url: `https://www.facebook.com/dialog/send?app_id=1174076712654826&link=${url}`,
  },
  // {
  //   provider: 'twitter',
  //   url: 'katt',
  // },
  {
    provider: 'email',
    url: `mailto:?subject=See this Wrench project&body=See this Wrench project ${url}`,
  },
  {
    provider: 'copy',
    url,
  },
  {
    provider: 'cancel',
    cancel: true,
  },
]

function Share({ closeModal }) {
  const { t } = useTranslation()
  const router = useRouter()
  const providers = generateShareableUrl(`https://wrench.cc/${router.query.slug}`)

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

  return providers.map(({ provider, cancel, url }) => {
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
          <img style={{ width: 24, marginRight: 15 }} src={require(`./${provider}.svg`)} />
        )}
        <Text medium>{renderComponent({ provider, url, closeModal })}</Text>
      </div>
    )
  })
}

export default Share
