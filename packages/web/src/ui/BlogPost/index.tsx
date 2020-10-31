// @ts-nocheck
import React from 'react'
import Link from 'next/link'
import { TimeAgo, Avatar } from 'ui'
import { Base, Title, Content, Top, Name } from './styles'
import Image from 'ui/Image'

export const getText = (content) => {
  const data = JSON.parse(content)

  const text = data.blocks.map(({ type, data }, i) => {
    if (type === 'paragraph') {
      return data.text
    }
  })

  return text.join(' ').substring(0, 200)
}

export const getImages = (content) => {
  const data = JSON.parse(content)

  return data.blocks
    .filter(({ type }) => type === 'image')
    .map(({ type, data }, i) => {
      return {
        url: `${data.file.url}?w=650&h=650&dpr=1`,
        width: 640,
        height: 640,
      }
    })
}

function formatContent(content) {
  const data = JSON.parse(content)

  return data.blocks.map(({ type, data }, i) => {
    if (type === 'paragraph') {
      return <p key={i} dangerouslySetInnerHTML={{ __html: data.text }} />
    }

    if (type === 'header') {
      return <p key={i} className="header" dangerouslySetInnerHTML={{ __html: data.text }} />
    }

    if (type === 'image') {
      // TODO: Get size from upload data
      return (
        <div style={{ marginBottom: 20 }} key={i}>
          <Image
            source={data.file.url}
            title={data.caption}
            width={770}
            height={400}
            alt={data?.caption}
          />
        </div>
      )
    }

    if (type === 'list') {
      return (
        <ul key={i}>
          {data.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      )
    }
  })
}

function BlogPost({ title, user, createdAt, content, slug }) {
  return (
    <Base>
      {slug ? (
        <Link href={`/blog/${slug}`}>
          <a>
            <Title fontSize="36">{title}</Title>
          </a>
        </Link>
      ) : (
        <Title fontSize="36">{title}</Title>
      )}
      <Top>
        <Link href={`/${user.username}`}>
          <a>
            <Avatar uri={user.avatarUrl} isOnline={user.isOnline} />
          </a>
        </Link>
        <Link href={`/${user.username}`}>
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
