// @ts-nocheck
import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useTranslation } from 'i18n'
import styled from 'styled-components'
import Seo from 'utils/seo'
import { usePaginatedQuery, BlogPostsDocument } from '@wrench/common'
import { Post, Layout, Loader, BlogPost } from 'ui'
import Popular from 'components/Popular'
import Footer from 'components/Footer'
import ProjectTypes from 'components/ProjectTypes'
import { List, Title, Card } from './styles'

export default function Blog() {
  const { t } = useTranslation('blog')

  const {
    data: { edges },
    fetchMore,
    hasNextPage,
  } = usePaginatedQuery(['blogPosts'])(BlogPostsDocument, {
    variables: {
      first: 3,
    },
  })

  return (
    <>
      <Layout column>
        <Seo
          config={{
            title: t('title'),
          }}
        />

        <div className="blog">
          <InfiniteScroll loadMore={fetchMore} hasMore={hasNextPage} loader={<Loader key={0} />}>
            <List>
              <Title medium>{t('title')}</Title>

              {edges?.map(({ node }) => (
                <BlogPost
                  key={node.id}
                  title={node.title}
                  user={node.user}
                  createdAt={node.createdAt}
                  content={node.content}
                  slug={node.slug}
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
