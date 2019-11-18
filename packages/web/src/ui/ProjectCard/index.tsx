// @ts-nocheck
import React from 'react'
import Link from 'next/link'
import Text from '../Text'
import { Base, Picture, ProjectName, Inner, Overlay, WIDTH, HEIGHT } from './styles'

function Card({ image, title, slug, user }) {
  return (
    <Base>
      <Picture source={image} width={WIDTH} height={HEIGHT} />
      <Overlay />

      <Inner>
        <ProjectName medium color="white">
          {title}
        </ProjectName>
        <Link href="/[username]" as={`/${user.username}`}>
          <Text fontSize={15} color="white">
            {user.fullName}
          </Text>
        </Link>
      </Inner>
    </Base>
  )
}

export default Card
