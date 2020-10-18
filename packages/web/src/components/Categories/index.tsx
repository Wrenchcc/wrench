// @ts-nocheck
import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Seo from 'utils/seo'
import { usePaginatedQuery, ProjectsDocument } from '@wrench/common'
import { Post, Layout, Loader } from 'ui'
import Popular from 'components/Popular'
import ProjectTypes from 'components/ProjectTypes'
import { List, Title, Card } from './styles'

export default function Categories() {
  const router = useRouter()
  const { id } = router.query

  const {
    data: { edges },
    fetchMore,
    hasNextPage,
  } = usePaginatedQuery(['projects'])(ProjectsDocument, {
    variables: {
      typeId: id,
      type: 'RECENT',
      first: 8,
    },
  })

  return (
    <Layout column paddingTop={40}>
      <Seo
        config={{
          title: 'Explore',
        }}
      />

      <ProjectTypes selectedId={id} />

      {/* <Title medium>Recent posts</Title> */}
      <InfiniteScroll loadMore={fetchMore} hasMore={hasNextPage} loader={<Loader key={0} />}>
        <List>
          {edges &&
            edges.map(({ node }) => (
              <Card
                key={node.id}
                image={node.cover.uri}
                title={node.title}
                slug={node.slug}
                user={node.user}
              />
            ))}
        </List>
      </InfiniteScroll>
    </Layout>
  )
}
