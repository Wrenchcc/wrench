// @ts-nocheck
import * as React from 'react'
import Link from 'next/link'
import Avatar from '../Avatar'
import Carousel from '../Carousel'
import Text from '../Text'
import LikePost from 'components/LikePost'
import TimeAgo from '../TimeAgo'
import { Base, Top, Title, Comments, Bottom } from './styles'

function Post({ data, withoutTitle, withoutAvatar }) {
  return (
    <Base>
      {!withoutAvatar && (
        <Top>
          <Link href={`/${data.user.username}`}>
            <a>
              <Avatar uri={data.user.avatarUrl} size={40} isOnline={data.user.isOnline} />
            </a>
          </Link>
        </Top>
      )}

      {!withoutTitle && (
        <Link href={`/project/${data.project.slug}`}>
          <a>
            <Title>{data.project.title}</Title>
          </a>
        </Link>
      )}

      <Text color={withoutTitle ? 'inverse' : 'neutral'}>{data.caption}</Text>

      <Bottom>
        <Carousel files={data.files} />
        <LikePost post={data} />
        <Comments data={data} postId={data.id} />
        <TimeAgo date={data.createdAt} long fontSize={14} />
      </Bottom>
    </Base>
  )
}

export default Post
