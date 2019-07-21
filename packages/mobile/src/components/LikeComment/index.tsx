import React, { useCallback } from 'react'
import { useMutation, LIKE_COMMENT_MUTATION } from 'gql'
import { Icon } from 'ui'
import { spark, sparkActive } from 'images'

function LikeComment({ comment }) {
  // const [toggleLike] = useMutation(LIKE_COMMENT_MUTATION)

  const handleToggleLike = useCallback(
    () => {}
    // toggleLike({
    //   variables: {
    //     id: comment.id,
    //   },
    // optimisticResponse: {
    //   __typename: 'Mutation',
    //   like: {
    //     __typename: 'Post',
    //     ...comment,
    //     likes: {
    //       __typename: 'Likes',
    //       isLiked: !comment.likes.isLiked,
    //       totalCount: comment.likes.isLiked
    //         ? comment.likes.totalCount - 1
    //         : comment.likes.totalCount + 1,
    //     },
    //   },
    // },
    // }),
    // [toggleLike]
  )

  return <Icon source={false ? sparkActive : spark} onPress={handleToggleLike} />
}

export default LikeComment
