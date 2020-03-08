// @ts-nocheck
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Base, Users, User, Avatar, Count } from './styles'

const Followers = memo(function Followers({ followers, project, className }) {
  const { t } = useTranslation()

  return (
    <Base className={className}>
      <Users>
        {followers.edges &&
          followers.edges.map(({ node }, index) => (
            <User first={index === 0} key={node.id}>
              <Link href="/[username]" as={`/${node.username}`}>
                <a>
                  <Avatar uri={node.avatarUrl} size={30} />
                </a>
              </Link>
            </User>
          ))}
      </Users>
      <Link href="/project/[id]/followers" as={`/project/${project.id}/followers`}>
        <a>
          <Count fontSize={15}>{t('UiFollowers:followers', { count: followers.totalCount })}</Count>
        </a>
      </Link>
    </Base>
  )
})

export default Followers
