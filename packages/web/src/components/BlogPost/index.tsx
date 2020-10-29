// @ts-nocheck
import React from 'react'
import { ArrowLeftIcon } from '@wrench/ui'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'i18n'
import styled from 'styled-components'
import Seo from 'utils/seo'
import { useBlogPostQuery } from '@wrench/common'
import { Post, Layout, Loader, BlogPost as UIBlogPost, Text } from 'ui'
import { getImages, getText } from 'ui/BlogPost'
import Popular from 'components/Popular'
import Footer from 'components/Footer'
import ProjectTypes from 'components/ProjectTypes'
import { List, A } from './styles'

export default function BlogPost() {
  const router = useRouter()
  const { slug } = router.query

  const { t } = useTranslation('blog-post')

  const { data, loading } = useBlogPostQuery({
    variables: {
      slug,
    },
  })

  if (loading) {
    return null
  }

  return (
    <>
      <Layout column>
        <Seo
          config={{
            title: `${t('title')} - ${data?.blogPost.title}`,
            description: getText(data?.blogPost.content),
            openGraph: {
              title: `${t('title')} - ${data?.blogPost.title}`,
              url: `https://wrench.cc/blog/${slug}`,
              type: 'website',
              images: getImages(data?.blogPost.content),
              description: getText(data?.blogPost.content),
              site_name: 'Wrench',
            },
          }}
        />

        <Link href="/blog">
          <A>
            <ArrowLeftIcon style={{ marginRight: 10 }} />
            <Text>{t('back')}</Text>
          </A>
        </Link>

        <div className="blog">
          <List>
            <UIBlogPost
              title={data?.blogPost.title}
              user={data?.blogPost.user}
              createdAt={data?.blogPost.createdAt}
              content={data?.blogPost.content}
            />
          </List>
        </div>
      </Layout>
      <Footer />
    </>
  )
}
