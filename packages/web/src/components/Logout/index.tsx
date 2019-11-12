import React from 'react'
import Link from 'next/link'
import { useApolloClient } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import { Base } from './styles'

function Logout({ username }) {
  const { t } = useTranslation()
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
            <a>{t('Logout:profile')}</a>
          </Link>
        </li>
        <li>
          <Link href="/settings">
            <a>{t('Logout:settings')}</a>
          </Link>
        </li>
        <li>
          <a onClick={() => client.resetStore()}>{t('Logout:logout')}</a>
        </li>
      </ul>
    </Base>
  )
}

export default Logout
