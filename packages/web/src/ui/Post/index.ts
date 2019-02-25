import * as React from 'react'
import Avatar from '../Avatar'
import Carousel from '../Carousel'
import Title from '../Title'
import { Base, Content } from './styles'

function Post({ data }) {
  return (
    <Base>
      <Carousel files={data.files} />
      <Content>
        <Avatar uri={data.user.avatarUrl} size={40} />
        <Title>{data.project.title}</Title>
      </Content>
    </Base>
  )
}

export default Post
