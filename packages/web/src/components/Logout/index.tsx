import React from 'react'
import Link from 'next/link'
import { useApolloClient } from '@apollo/client'
import { useTranslation } from 'i18n'
import { Base } from './styles'

function Logout({ username, onPress }) {
  const { t } = useTranslation('logout')
  const client = useApolloClient()

  return (
    <Base>
      <ul>
        <li>
          <Link href={`/${username}`}>
            <a onClick={onPress}>{t('profile')}</a>
          </Link>
        </li>
        <li>
          <Link href="/settings">
            <a onClick={onPress}>{t('settings')}</a>
          </Link>
        </li>
        <li>
          <a
            onClick={() => {
              onPress()
              client.resetStore()
            }}
          >
            {t('logout')}
          </a>
        </li>
      </ul>
    </Base>
  )
}

export default Logout
