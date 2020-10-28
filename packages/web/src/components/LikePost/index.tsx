// @ts-nocheck
import React, { useCallback, memo, useEffect } from 'react'
import { useTranslation } from 'i18n'
import { useRouter } from 'next/router'
import { useLikePostMutation } from '@wrench/common'

import { Text, Icon } from 'ui'
import { useCookie, Cookies } from 'hooks'
import { useModal, Modal } from 'ui/Modal'
import Login from 'components/Login'
import { Base } from './styled'

const ACTION = 'spark'

function LikePost({ post }) {
  const { t } = useTranslation('like-post')
  const [isAuthenticated] = useCookie(Cookies.ACCESS_TOKEN)
  const [toggleLike] = useLikePostMutation()
  const router = useRouter()

  const [showModal, closeModal] = useModal(() => (
    <Modal close={closeModal}>
      <Login closeModal={closeModal} referral={`${router.asPath}?action=${ACTION}&id=${post.id}`} />
    </Modal>
  ))

  const handleToggleLike = useCallback(
    id => {
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
      <Icon
        style={{ marginRight: 10 }}
        onClick={() => handleToggleLike(post.id)}
        alt="Like post"
        noFill
        stroke={post.likes.isLiked ? 'warning' : 'inverse'}
        source={require('./spark.svg?include')}
      />

      <Text fontSize={15}>{t('like', { count: post.likes.totalCount })}</Text>
    </Base>
  )
}

export default memo(LikePost)
