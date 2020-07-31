import React, { useCallback, memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { LIKE_POST_MUTATION } from 'graphql/mutations/post/like'
import { Text } from 'ui'
import { useCookie, Cookies } from 'hooks'
import { useModal, Modal } from 'ui/Modal'
import Login from 'components/Login'
import { Base } from './styled'

const ACTION = 'spark'

function LikePost({ post }) {
  const { t } = useTranslation()
  const [isAuthenticated] = useCookie(Cookies.ACCESS_TOKEN)
  const [toggleLike] = useMutation(LIKE_POST_MUTATION)
  const router = useRouter()

  const [showModal, closeModal] = useModal(() => (
    <Modal close={closeModal}>
      <Login closeModal={closeModal} referral={`${router.asPath}?action=${ACTION}&id=${post.id}`} />
    </Modal>
  ))

  const handleToggleLike = useCallback(
    (id) => {
      if (!isAuthenticated) {
        showModal()
        return
      }

      toggleLike({
        variables: {
          id,
        },
        optimisticResponse: {
          __typename: 'Mutation',
          likePost: {
            __typename: 'Post',
            ...post,
            likes: {
              __typename: 'Likes',
              isLiked: !post.likes.isLiked,
              totalCount: post.likes.isLiked
                ? post.likes.totalCount - 1
                : post.likes.totalCount + 1,
            },
          },
        },
      })
    },
    [toggleLike, post]
  )

  useEffect(() => {
    if (
      router.query &&
      router.query.action === ACTION &&
      !post.likes.isLiked &&
      router.query.id === post.id
    ) {
      handleToggleLike(router.query.id)
    }
  }, [router.query])

  return (
    <Base>
      <img
        style={{ marginRight: 10 }}
        onClick={() => handleToggleLike(post.id)}
        src={post.likes.isLiked ? require('./spark-active.svg') : require('./spark.svg')}
        alt="Like post"
      />

      <Text fontSize={15}>{t('LikePost:like', { count: post.likes.totalCount })}</Text>
    </Base>
  )
}

export default memo(LikePost)
