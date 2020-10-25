// @ts-nocheck
import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Seo from 'utils/seo'
import { usePaginatedQuery, BlogPostsDocument } from '@wrench/common'
import { Post, Layout, Loader, BlogPost } from 'ui'
import Popular from 'components/Popular'
import Footer from 'components/Footer'
import ProjectTypes from 'components/ProjectTypes'
import { List, Title, Card } from './styles'

export default function Blog() {
  const {t} = useTranslation()
  // const router = useRouter()
  // const { id } = router.query

  const {
    data: { edges },
    fetchMore,
    hasNextPage,
  } = usePaginatedQuery(['blogPosts'])(BlogPostsDocument, {
    variables: {
      first: 2,
    },
  })

  return (
    <>
      <Layout column>
        <Seo
          config={{
            title: t('Blog:title'),
          }}
        />

        <div className="blog">
          <InfiniteScroll loadMore={fetchMore} hasMore={hasNextPage} loader={<Loader key={0} />}>
            <List>
            
              <Title medium>{t('Blog:title')}</Title>

              {edges?.map(({ node }) => (
                  <BlogPost
                    key={node.id}
                    title={node.title}
                    user={node.user}
                    createdAt={node.createdAt}
                    content={node.content}
                  />
                ))}
            </List>
          </InfiniteScroll>
        </div>
      </Layout>

      <Footer />
    </>
  )
}
