// @ts-nocheck
import React, { useRef, useState, useCallback } from 'react'
import { useQuery } from '@apollo/client'
import { useTranslation } from 'react-i18next'
import InfiniteScroll from 'react-infinite-scroller'
import { update } from 'ramda'
import { GET_COMMENTS, GET_MORE_REPLIES } from 'graphql/queries/comments'
import CommentField from 'components/CommentField'
import { Loader, Text } from 'ui'
import Item from './Item'
import { Base, Footer, Scroll, LoaderContainer, LoadReplies } from './styles'

function Comments({ postId }) {
  const { t } = useTranslation()
  const [mention, setMention] = useState()
  const [commentId, setCommentId] = useState()
  const inputRef = useRef()

  const { data, loading, fetchMore } = useQuery(GET_COMMENTS, {
    variables: {
      postId,
    },
  })

  const handleLoadMore = useCallback(
    (id, after) => {
      fetchMore({
        query: GET_MORE_REPLIES,
        variables: {
          id,
          after,
          postId,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult.comment.replies) {
            return prev
          }

          const index = prev.comments.edges.findIndex(({ node }) => node.id === id)

          return {
            ...prev,
            comments: {
              ...prev.comments,
              edges: update(
                index,
                {
                  ...prev.comments.edges[index],
                  node: {
                    ...prev.comments.edges[index].node,
                    replies: {
                      ...prev.comments.edges[index].node.replies,
                      ...fetchMoreResult.comment.replies,
                      edges: [
                        ...prev.comments.edges[index].node.replies.edges,
                        ...fetchMoreResult.comment.replies.edges,
                      ],
                    },
                  },
                },
                prev.comments.edges
              ),
            },
          }
        },
      })
    },
    [commentId, postId]
  )

  const handleReply = useCallback(
    ({ id, user }) => {
      setMention(`@${user.username} `)
      setCommentId(id)
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
          {data.comments.edges.map(({ node }) => {
            const replies = node.replies

            return replies ? (
              <>
                <Item key={node.id} {...node} onReply={handleReply} />
                {replies.edges.map(({ node }) => (
                  <Item
                    key={node.id}
                    isReply
                    {...node}
                    commentId={node.id}
                    onReply={handleReply}
                    postId={postId}
                  />
                ))}
                {replies.totalCount > replies.edges.length && (
                  <LoadReplies
                    onClick={() =>
                      handleLoadMore(node.id, replies.edges[replies.edges.length - 1].cursor)
                    }
                  >
                    <Text medium fontSize={12} color="light_grey">
                      {t('Comments:loadReplies', {
                        count: replies.totalCount - replies.edges.length,
                      })}
                    </Text>
                  </LoadReplies>
                )}
              </>
            ) : (
              <Item key={node.id} {...node} onReply={handleReply} />
            )
          })}
        </InfiniteScroll>
      </Scroll>

      <Footer>
        <CommentField postId={postId} commentId={commentId} ref={inputRef} initialValue={mention} />
      </Footer>
    </Base>
  )
}

export default Comments
