// @ts-nocheck
import React, { useCallback } from 'react'
import { SparkIcon } from '@wrench/ui'
import { useLikeCommentMutation } from '@wrench/common'
import { Icon } from 'ui'
import { Base } from './styles'

function LikeComment({ comment }) {
  const [toggleLike] = useLikeCommentMutation()

  const handleToggleLike = useCallback(() => {
    toggleLike({
      variables: {
        id: comment.id,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        likeComment: {
          __typename: 'Comment',
          ...comment,
          likes: {
            __typename: 'Likes',
            isLiked: !comment.likes.isLiked,
            totalCount: comment.likes.isLiked
              ? comment.likes.totalCount - 1
              : comment.likes.totalCount + 1,
          },
        },
      },
    })
  }, [toggleLike, comment])

  return (
    <Base>
      <SparkIcon
        small
        onClick={() => handleToggleLike(comment.id)}
        style={{ marginRight: 10 }}
        color={comment.likes.isLiked ? 'warning' : 'inverse'}
      />
    </Base>
  )
}

export default LikeComment
