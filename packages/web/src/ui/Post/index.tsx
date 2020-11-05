// @ts-nocheck
import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useTranslatePostMutation } from '@wrench/common'
import { ChevronRightIcon } from '@wrench/ui'
import Avatar from '../Avatar'
import Carousel from '../Carousel'
import Text from '../Text'
import LikePost from 'components/LikePost'
import TimeAgo from '../TimeAgo'
import { Base, Top, Title, Comments, Bottom, Footer, Collection } from './styles'

function Post({ data, withoutTitle, withoutCollections, withoutAvatar }) {
  const { t } = useTranslation('post')

  const [original, setOriginal] = useState(true)
  const [translatePost, { loading: translationLoading }] = useTranslatePostMutation()

  const handleTranslation = useCallback(() => {
    setOriginal(!original)

    translatePost({
      variables: {
        id: data.id,
        original: !original,
      },
    })
  }, [data, original])

  return (
    <Base>
      {!withoutAvatar && (
        <Top>
          <Link href={`/${data.user.username}`}>
            <a>
              <Avatar uri={data.user.avatarUrl} size={40} isOnline={data.user.isOnline} />
            </a>
          </Link>
        </Top>
      )}

      {!withoutTitle && (
        <Link href={`/project/${data.project.slug}`}>
          <a>
            <Title>{data.project.title}</Title>
          </a>
        </Link>
      )}

      <Text color={withoutTitle ? 'inverse' : 'neutral'}>{data.caption}</Text>

      <Bottom>
        <Carousel files={data.files} />

        {!withoutCollections && data.collection && (
          <Link href={`/project/${data.project.slug}/collection/${data.collection.slug}`}>
            <Collection>
              <a>
                <Text fontSize={15} medium>
                  {t('showCollection')}
                </Text>
              </a>
              <ChevronRightIcon />
            </Collection>
          </Link>
        )}

        <LikePost post={data} />
        <Comments data={data} postId={data.id} />

        <Footer>
          <TimeAgo date={data.createdAt} long fontSize={14} />

          {data?.translatable && (
            <>
              <Text color="neutral" medium fontSize={12}>
                <span style={{ marginLeft: 7, marginRight: '7px', display: 'block' }}>•</span>
              </Text>
              {translationLoading ? (
                <Text color="inverse" medium fontSize={12}>
                  {t('loading')}
                </Text>
              ) : (
                <span onClick={handleTranslation} style={{ cursor: 'pointer' }}>
                  <Text color="inverse" medium fontSize={12}>
                    {original ? t('translation') : t('original')}
                  </Text>
                </span>
              )}
            </>
          )}
        </Footer>
      </Bottom>
    </Base>
  )
}

export default Post
