// @ts-nocheck
import InfiniteScroll from 'react-infinite-scroller'
import styled from 'styled-components'
import { usePaginatedQuery, PostsDocument } from '@wrench/common'
import Seo from 'utils/seo'
import { Post, Layout, Loader } from 'ui'
import UiTitle from 'ui/Title'
import Popular from 'components/Popular'
import ProjectTypes from 'components/ProjectTypes'

const Title = styled(UiTitle)`
  margin-bottom: 50px;
`

function Explore() {
  const {
    data: { edges },
    isFetching,
    fetchMore,
    hasNextPage,
  } = usePaginatedQuery(['posts'])(PostsDocument)

  return (
    <Layout column paddingTop={40}>
      <Seo
        config={{
          title: 'Explore',
        }}
      />

      <ProjectTypes />

      <Popular />

      <Title medium>Recent posts</Title>
      <InfiniteScroll loadMore={fetchMore} hasMore={hasNextPage} loader={<Loader key={0} />}>
        {edges?.map(({ node }) => (
          <Post data={node} key={node.id} />
        ))}
      </InfiniteScroll>
    </Layout>
  )
}

export default Explore
