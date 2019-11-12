// @ts-nocheck
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Base, Users, User, Avatar, Count } from './styles'

const Followers = memo(function Followers({ followers, className }) {
  const { t } = useTranslation()

  return (
    <Base className={className}>
      <Users>
        {followers.edges &&
          followers.edges.map(({ node }, index) => (
            <User first={index === 0} key={node.id}>
              <Link
                href={{
                  pathname: '/user',
                  query: { username: node.username },
                }}
                as={{
                  pathname: `/${node.username}`,
                }}
              >
                <a>
                  <Avatar uri={node.avatarUrl} size={30} />
                </a>
              </Link>
            </User>
          ))}
      </Users>
      <Count fontSize={15}>{t('UiFollowers:followers', { count: followers.totalCount })}</Count>
    </Base>
  )
})

export default Followers
