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
          <Link
            href={{
              pathname: '/user',
              query: { username },
            }}
            as={{
              pathname: `/${username}`,
            }}
          >
            <a onClick={onPress}>{t('PROFILE')}</a>
          </Link>
        </li>
        <li>
          <Link href="/settings">
            <a onClick={onPress}>{t('SETTINGS')}</a>
          </Link>
        </li>
        <li>
          <a
            onClick={() => {
              onPress()
              client.resetStore()
            }}
          >
            {t('LOGOUT')}
          </a>
        </li>
      </ul>
    </Base>
  )
}

export default Logout
