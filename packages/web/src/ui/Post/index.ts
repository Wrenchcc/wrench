import * as React from 'react'
import Avatar from '../Avatar'
import Carousel from '../Carousel'
import { Base, Content, Title, Text, Comments } from './styles'

function Post({ data }) {
  return (
    <Base>
      <Carousel files={data.files} />
      <Content>
        <Avatar uri={data.user.avatarUrl} size={40} />
        <Title>{data.project.title}</Title>
        <Text color="light_grey">{data.caption}</Text>
        <Comments data={data.comments.edges} />
      </Content>
    </Base>
  )
}

export default Post
