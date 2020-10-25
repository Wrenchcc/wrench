// @ts-nocheck
import React, { useCallback } from 'react'
import { useMutation } from '@apollo/client'
import { LIKE_COMMENT_MUTATION } from 'graphql/mutations/comment/like'
import { Icon } from 'ui'
import { Base } from './styles'

function LikeComment({ comment }) {
  const [toggleLike] = useMutation(LIKE_COMMENT_MUTATION)

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
      <Icon
        width={10}
        style={{ marginRight: 10 }}
        onClick={() => handleToggleLike(comment.id)}
        alt="Like comment"
        noFill
        stroke={comment.likes.isLiked ? 'warning' : 'inverse'}
        source={require('./spark.svg?include')}
      />
    </Base>
  )
}

export default LikeComment
