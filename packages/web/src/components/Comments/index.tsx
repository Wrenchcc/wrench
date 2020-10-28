// @ts-nocheck
import React, { useRef, useState, useCallback } from 'react'
import { useTranslation } from 'i18n'
import { CommentsDocument, RepliesDocument, usePaginatedQuery } from '@wrench/common'
import InfiniteScroll from 'react-infinite-scroller'
import { update } from 'ramda'
import CommentField from 'components/CommentField'
import { Loader, Text } from 'ui'
import Item from './Item'
import { Base, Footer, Scroll, LoaderContainer, LoadReplies } from './styles'

function Comments({ postId }) {
  const { t } = useTranslation('comments')
  const [mention, setMention] = useState()
  const [commentId, setCommentId] = useState()
  const inputRef = useRef()

  const {
    data: { edges, post },
    isFetching,
    fetchMore,
    hasNextPage,
  } = usePaginatedQuery(['comments'])(CommentsDocument, {
    variables: {
      postId,
    },
  })

  // TODO: Convert to fieldPolicy
  const fetchReplies = ({ id, after }) =>
    fetchMore({
      query: RepliesDocument,
      variables: {
        after,
        id,
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

  const handleReply = useCallback(
    ({ id, user }) => {
      setMention(`@${user.username} `)
      setCommentId(id)
      inputRef.current.focus()
    },
    [setMention, inputRef]
  )

  if (isFetching) {
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
          hasMore={hasNextPage}
          loadMore={fetchMore}
          useWindow={false}
          loader={
            <LoaderContainer>
              <Loader key={0} />
            </LoaderContainer>
          }
          useWindow={false}
        >
          {edges?.map(({ node }) => {
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
                      fetchReplies({
                        id: node.id,
                        after: replies.edges[replies.edges.length - 1].cursor,
                      })
                    }
                  >
                    <Text medium fontSize={12} color="neutral">
                      {t('loadReplies', {
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
