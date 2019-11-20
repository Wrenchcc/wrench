// @ts-nocheck
import React, { useRef, useState, useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'
import InfiniteScroll from 'react-infinite-scroller'
import Link from 'next/link'
import { GET_COMMENTS } from 'graphql/queries/comments'
import CommentField from 'components/CommentField'
import { Avatar, Loader, TimeAgo, Text } from 'ui'
import {
  Base,
  Footer,
  Inner,
  Comment,
  Scroll,
  Content,
  Username,
  Meta,
  Reply,
  LoaderContainer,
} from './styles'

function Comments({ postId }) {
  const [mention, setMention] = useState()
  const inputRef = useRef()

  const { data, loading, fetchMore } = useQuery(GET_COMMENTS, {
    variables: {
      postId,
    },
  })

  const handleReply = useCallback(
    ({ id, user }) => {
      setMention(`@${user.username} `)
      inputRef.current.focus()
    },
    [setMention, inputRef]
  )

  if (loading) {
    return (
      <LoaderContainer fullscreen>
        <Loader />
      </LoaderContainer>
    )
  }

  return (
    <Base>
      <Scroll>
        <InfiniteScroll
          hasMore={data.comments.pageInfo.hasNextPage}
          loadMore={() =>
            fetchMore({
              variables: {
                after: data.comments.edges[data.comments.edges.length - 1].cursor,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                  return prev
                }

                return {
                  ...prev,
                  comments: {
                    ...prev.comments,
                    pageInfo: {
                      ...prev.comments.pageInfo,
                      ...fetchMoreResult.comments.pageInfo,
                    },
                    edges: [...prev.comments.edges, ...fetchMoreResult.comments.edges],
                  },
                }
              },
            })
          }
          useWindow={false}
          loader={
            <LoaderContainer>
              <Loader key={0} />
            </LoaderContainer>
          }
          useWindow={false}
        >
          {data.comments.edges.map(({ node }) => (
            <Inner key={node.id}>
              <Link href="/[username]" as={`/${node.user.username}`}>
                <a>
                  <Avatar uri={node.user.avatarUrl} isOnline={node.user.isOnline} />
                </a>
              </Link>

              <Content>
                <Link href="/[username]" as={`/${node.user.username}`}>
                  <a>
                    <Username bold fontSize={15}>
                      {node.user.fullName}&nbsp;
                    </Username>
                  </a>
                </Link>

                <Comment fontSize={15}>{node.text}</Comment>

                <Meta>
                  <TimeAgo date={node.createdAt} />
                  <Reply onClick={() => handleReply(node)}>
                    <Text medium fontSize={12}>
                      Reply
                    </Text>
                  </Reply>
                </Meta>
              </Content>
            </Inner>
          ))}
        </InfiniteScroll>
      </Scroll>

      <Footer>
        <CommentField postId={postId} ref={inputRef} initialValue={mention} />
      </Footer>
    </Base>
  )
}

export default Comments
