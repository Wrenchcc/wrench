// @ts-nocheck
import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import Seo from 'utils/seo'
import { useBlogPostQuery } from '@wrench/common'
import { Post, Layout, Loader, BlogPost as UIBlogPost } from 'ui'
import Popular from 'components/Popular'
import Footer from 'components/Footer'
import ProjectTypes from 'components/ProjectTypes'
import { List, Title, Card } from './styles'

export default function BlogPost() {
  const { t } = useTranslation()

  const { data } = useBlogPostQuery({
    variables: {
      slug: 'roadmap',
    },
  })

  console.log(data)
  return null

  return (
    <>
      <Layout column>
        <Seo
          config={{
            title: t('Blog:title'),
          }}
        />

        <div className="blog">
          <List>
            {edges?.map(({ node }) => (
              <UIBlogPost
                key={node.id}
                title={node.title}
                user={node.user}
                createdAt={node.createdAt}
                content={node.content}
              />
            ))}
          </List>
        </div>
      </Layout>

      <Footer />
    </>
  )
}
