// @ts-nocheck
import * as React from 'react'
import Link from 'next/link'
import Avatar from '../Avatar'
import Carousel from '../Carousel'
import Text from '../Text'
import { Base, Top, Title, Comments, Bottom } from './styles'

function Post({ data, withoutTitle, withoutAvatar }) {
  return (
    <Base>
      {!withoutAvatar && (
        <Top>
          <Link
            href={{
              pathname: '/user',
              query: { username: data.user.username },
            }}
            as={{
              pathname: `/${data.user.username}`,
            }}
          >
            <a>
              <Avatar uri={data.user.avatarUrl} size={40} isOnline={data.user.isOnline} />
            </a>
          </Link>
        </Top>
      )}

      {!withoutTitle && (
        <Link
          href={{
            pathname: '/project',
            query: { slug: data.project.slug },
          }}
          as={{
            pathname: `/project/${data.project.slug}`,
          }}
        >
          <a>
            <Title>{data.project.title}</Title>
          </a>
        </Link>
      )}
      <Text color={withoutTitle ? 'black' : 'grey'}>{data.caption}</Text>

      <Bottom>
        <Carousel files={data.files} />
        <Comments data={data.comments.edges} />
      </Bottom>
    </Base>
  )
}

export default Post
