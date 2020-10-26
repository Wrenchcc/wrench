// @ts-nocheck
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import Seo from 'utils/seo'
import { useBlogPostQuery } from '@wrench/common'
import { Post, Layout, Loader, BlogPost as UIBlogPost, Icon } from 'ui'
import Popular from 'components/Popular'
import Footer from 'components/Footer'
import ProjectTypes from 'components/ProjectTypes'
import { List, A } from './styles'

export default function BlogPost() {
  const router = useRouter()
  const { slug } = router.query

  const { t } = useTranslation()

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
            title: `${t('BlogPost:title')} - ${data?.blogPost.title}`,
          }}
        />

        <Link href="/blog">
          <A>
            <Icon
              style={{ marginTop: 2, marginRight: 5 }}
              source={require('./arrowBack.svg?include')}
              width="22px"
            />
            {t('BlogPost:back')}
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
