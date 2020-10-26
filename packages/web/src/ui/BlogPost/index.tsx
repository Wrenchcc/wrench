// @ts-nocheck
import React from 'react'
import Link from 'next/link'
import { TimeAgo, Image, Avatar } from 'ui'
import { Base, Title, Content, Top, Name } from './styles'

function formatContent(content) {
  const data = JSON.parse(content)

  return data.blocks.map(({ type, data }) => {
    if (type === 'paragraph') {
      return <p dangerouslySetInnerHTML={{ __html: data.text }} />
    }

    if (type === 'header') {
      return <p class="header" dangerouslySetInnerHTML={{ __html: data.text }} />
    }

    if (type === 'image') {
      return (
        <div style={{ marginBottom: 20 }}>
          <Image source={data.file.url} title={data.caption} />
        </div>
      )
    }

    if (type === 'list') {
      return (
        <ul>
          {data.items.map((item) => (
            <li dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      )
    }
  })
}

function BlogPost({ title, user, createdAt, content, slug }) {
  return (
    <Base>
      <Link href="/blog/[slug]" as={`/blog/${slug}`}>
        <a>
          <Title fontSize="36">{title}</Title>
        </a>
      </Link>
      <Top>
        <Link href="/[username]" as={`/${user.username}`}>
          <a>
            <Avatar uri={user.avatarUrl} isOnline={user.isOnline} />
          </a>
        </Link>
        <Link href="/[username]" as={`/${user.username}`}>
          <a>
            <Name fontSize={14} className="username">
              {user.fullName}
            </Name>
          </a>
        </Link>
        <TimeAgo date={createdAt} long fontSize={14} />
      </Top>

      <Content className="content">{formatContent(content)}</Content>
    </Base>
  )
}

export default BlogPost
