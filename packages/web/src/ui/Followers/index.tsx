// @ts-nocheck
import React from 'react'
import { useTranslation } from 'i18n'
import Link from 'next/link'
import { Base, Users, User, Avatar, Count } from './styles'

function Followers({ followers, project, className }) {
  const { t } = useTranslation('followers')

  return (
    <Base className={className}>
      <Users>
        {followers.edges &&
          followers.edges.map(({ node }, index) => (
            <User first={index === 0} key={node.id}>
              <Link href={`/${node.username}`}>
                <a>
                  <Avatar uri={node.avatarUrl} size={30} />
                </a>
              </Link>
            </User>
          ))}
      </Users>
      <Link href={`/project/${project.id}/followers`}>
        <a>
          <Count fontSize={15}>{t('followers', { count: followers.totalCount })}</Count>
        </a>
      </Link>
    </Base>
  )
}

export default Followers
