import * as React from 'react'
import Link from 'next/link'
import Avatar from '../Avatar'
import Carousel from '../Carousel'
import { Base, Content, Title, Text, Comments } from './styles'

function Post({ data, withoutTitle, withoutAvatar }) {
  return (
    <Base>
      <Carousel files={data.files} />
      <Content>
        {!withoutAvatar && (
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
              <Avatar uri={data.user.avatarUrl} size={withoutTitle ? 60 : 40} />
            </a>
          </Link>
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
        <Comments data={data.comments.edges} />
      </Content>
    </Base>
  )
}

export default Post
