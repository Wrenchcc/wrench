import React, { memo } from 'react'
import Link from 'next/link'
import Text from '../Text'
import { Base, Picture, ProjectName } from './styles'

const Card = memo(function Card({ image, title, slug, user }) {
  return (
    <Base>
      <Link
        href={{
          pathname: '/project',
          query: { slug },
        }}
        as={{
          pathname: `/project/${slug}`,
        }}
      >
        <a>
          <Picture source={image} />
          <ProjectName medium>{title}</ProjectName>
        </a>
      </Link>
      <Link
        href={{
          pathname: '/user',
          query: { username: user.username },
        }}
        as={{
          pathname: `/${user.username}`,
        }}
      >
        <a>
          <Text fontSize={15} color="grey">
            {user.fullName}
          </Text>
        </a>
      </Link>
    </Base>
  )
})

export default Card
