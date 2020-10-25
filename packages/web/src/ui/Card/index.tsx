// @ts-nocheck
import React, { memo } from 'react'
import Link from 'next/link'
import { Base, Picture, Username, ProjectName } from './styles'

const Card = memo(function Card({
  image,
  title,
  slug,
  user,
  size = 235,
  marginLeft,
  marginBottom,
  onPress,
  className,
}) {
  return (
    <Base
      size={size}
      marginLeft={marginLeft}
      marginBottom={marginBottom}
      onClick={onPress}
      className={className}
    >
      <Link href="/project/[slug]" as={`/project/${slug}`}>
        <a>
          <Picture source={image} width={size} height={size} size={size} />
          <ProjectName medium>{title}</ProjectName>
        </a>
      </Link>
      <Link href="/[username]" as={`/${user.username}`}>
        <a>
          <Username fontSize={15} color="neutral">
            {user.fullName}
          </Username>
        </a>
      </Link>
    </Base>
  )
})

export default Card
