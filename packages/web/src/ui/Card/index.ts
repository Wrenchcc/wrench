import React, { memo } from 'react'
import Link from 'next/link'
import { Base, Picture, ProjectName } from './styles'

const Card = memo(function Card({ image, title, slug }) {
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
          <ProjectName numberOfLines={1}>{title}</ProjectName>
        </a>
      </Link>
    </Base>
  )
})

export default Card
