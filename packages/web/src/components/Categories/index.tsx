// @ts-nocheck
import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import styled from 'styled-components'
import Seo from 'utils/seo'
import { usePaginatedQuery, ProjectsDocument } from '@wrench/common'
import { Post, Layout, Loader } from 'ui'
import UiTitle from 'ui/Title'
import Popular from 'components/Popular'
import ProjectTypes from 'components/ProjectTypes'

const Title = styled(UiTitle)`
  margin-bottom: 50px;
`

export default function Categories({ id, ...rest }) {
  console.log(rest)
  const {
    data: { edges },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedQuery(['projects'])(ProjectsDocument, {
    variables: {
      typeId: id,
      type: 'RECENT',
    },
  })

  if (isFetching) {
    return null
  }

  return (
    <Layout column paddingTop={40}>
      <Seo
        config={{
          title: 'Explore',
        }}
      />

      <ProjectTypes selectedId={id} />

      {/* <Title medium>Recent posts</Title> */}
      <InfiniteScroll
        loadMore={() =>
          fetchMore({
            variables: {
              after: edges[edges.length - 1].cursor,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return prev
              }

              return {
                ...prev,
                posts: {
                  ...prev.posts,
                  pageInfo: {
                    ...prev.posts.pageInfo,
                    ...fetchMoreResult.posts.pageInfo,
                  },
                  edges: [...prev.posts.edges, ...fetchMoreResult.posts.edges],
                },
              }
            },
          })
        }
        hasMore={false}
        loader={<Loader key={0} />}
      >
        {edges.map(({ node }) => null)}
      </InfiniteScroll>
    </Layout>
  )
}
