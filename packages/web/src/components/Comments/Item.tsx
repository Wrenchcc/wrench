// @ts-nocheck
import React from 'react'
import { useTranslation } from 'i18n'
import Link from 'next/link'
import { Avatar, TimeAgo, Text } from 'ui'
import LikeComment from 'components/LikeComment'
import { Inner, Comment, Content, Username, Meta, Reply, Action } from './styles'

function Item({ id, user, text, onReply, createdAt, isReply, likes }) {
  const { t } = useTranslation()

  return (
    <Inner key={id} isReply={isReply}>
      <Link href="/[username]" as={`/${user.username}`}>
        <a>
          <Avatar
            uri={user.avatarUrl}
            isOnline={!isReply && user.isOnline}
            size={isReply ? 20 : 30}
          />
        </a>
      </Link>

      <Content>
        <Link href="/[username]" as={`/${user.username}`}>
          <a>
            <Username bold fontSize={15}>
              {user.fullName}&nbsp;
            </Username>
          </a>
        </Link>

        <Comment fontSize={15}>{text}</Comment>

        <Meta>
          <Action>
            <TimeAgo date={createdAt} />
          </Action>
          <Action>
            <Text medium color="neutral" fontSize={12}>
              {t('Comments:like', { count: likes.totalCount })}
            </Text>
          </Action>
          <Action>
            <Reply onClick={() => onReply({ id, user })}>
              <Text medium fontSize={12}>
                {t('Comments:reply')}
              </Text>
            </Reply>
          </Action>
        </Meta>
      </Content>

      <LikeComment comment={{ id, user, text, likes }} />
    </Inner>
  )
}

export default Item
