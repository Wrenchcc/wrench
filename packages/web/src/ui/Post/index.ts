import * as React from 'react'
import Link from 'next/link'
import Avatar from '../Avatar'
import Carousel from '../Carousel'
import { Base, Content, Title, Text, Comments } from './styles'

function Post({ data, onPost }) {
  return (
    <Base>
      <Carousel files={data.files} />
      <Content>
        <Avatar uri={data.user.avatarUrl} size={onPost ? 60 : 40} />
        {!onPost && (
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
        <Text color="light_grey">{data.caption}</Text>
        <Comments data={data.comments.edges} />
      </Content>
    </Base>
  )
}

export default Post
