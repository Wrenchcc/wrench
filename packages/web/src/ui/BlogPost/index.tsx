// @ts-nocheck
import React from 'react'
import {TimeAgo, Image} from 'ui'
import { Base, Title, Text, Content, Top, Avatar, Name } from './styles'

function formatContent(content) {
  const data = JSON.parse(content)

  return data.blocks.map(({type, data}) => {
    if(type === 'paragraph') {
      return <Text>{data.text}</Text>
    }

    if(type === 'image') {
      return <Image source={data.file.url} /> 
    }

    if(type === 'list') {
      return <ul>{data.items.map((item) => <li dangerouslySetInnerHTML={{ __html: item }} />)}</ul>
    }
  })
}

function BlogPost({ title, user, createdAt, content }) {
  return (
    <Base>
      <Title fontSize="36">{title}</Title>
      <Top>
        <Avatar uri={user.avatarUrl} />
        <Name fontSize={14}>{user.fullName}</Name>
        <TimeAgo date={createdAt} long fontSize={14} />
      </Top>

      <Content>
        {formatContent(content)}
      </Content>
    </Base>
  )
}

export default BlogPost
