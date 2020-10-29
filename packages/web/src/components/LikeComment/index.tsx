// @ts-nocheck
import React, { useCallback } from 'react'
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
      {/* <Icon
        width={10}
        style={{ marginRight: 10 }}
        onClick={() => handleToggleLike(comment.id)}
        alt="Like comment"
        noFill
        stroke={comment.likes.isLiked ? 'warning' : 'inverse'}
        source={require('./spark.svg?include')}
      /> */}
    </Base>
  )
}

export default LikeComment
