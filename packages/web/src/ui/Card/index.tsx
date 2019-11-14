// @ts-nocheck
import React, { memo } from 'react'
import Link from 'next/link'
import Text from '../Text'
import { Base, Picture, ProjectName } from './styles'

const Card = memo(function Card({ image, title, slug, user }) {
  return (
    <Base>
      <Link href="/project/[slug]" as={`/project/${slug}`}>
        <a>
          <Picture source={image} width={235} height={235} />
          <ProjectName medium>{title}</ProjectName>
        </a>
      </Link>
      <Link href="/[username]" as={`/${user.username}`}>
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
