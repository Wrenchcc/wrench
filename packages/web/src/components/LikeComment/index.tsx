// @ts-nocheck
import React, { useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { LIKE_COMMENT_MUTATION } from 'graphql/mutations/comment/like'
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
      <img
        style={{ marginRight: 10 }}
        onClick={() => handleToggleLike(comment.id)}
        src={comment.likes.isLiked ? require('./spark-active.svg') : require('./spark.svg')}
        alt="Like comment"
      />
    </Base>
  )
}

export default LikeComment
