import InfiniteScroll from 'react-infinite-scroller'
import { useQuery } from 'react-apollo-hooks'
import { useTranslation } from 'react-i18next'
import Seo from '../../utils/seo'
import { PROJECT_BY_SLUG } from '../../graphql/queries/project/projectBySlug'
import { Post, Title, Followers, Layout } from '../../ui'
import { Left, Right, Follow, Share } from './styles'

function Project({ slug }) {
  const { t } = useTranslation()
  const { data, loading, fetchMore } = useQuery(PROJECT_BY_SLUG, {
    variables: { slug },
  })

  if (loading) {
    return null
  }

  return (
    <Layout>
      <Seo
        config={{
          title: t('project:title', { title: data.project.title, type: data.project.type.title }),
          description: t('project:description', {
            followers: data.project.followers.totalCount,
            posts: data.project.posts.totalCount,
            fullName: data.project.user.fullName,
            username: data.project.user.username,
          }),
        }}
      />

      <Left>
        <Title large lineHeight={78}>
          {data.project.title}
        </Title>

        <Followers count={data.project.followers.totalCount} />
        <Follow>Follow this project</Follow>
        <Share>Share</Share>
      </Left>

      <Right>
        <InfiniteScroll
          loadMore={() => fetchMore({
            variables: {
              after: data.project.posts.edges[data.project.posts.edges.length - 1].cursor,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev

              return {
                ...prev,
                project: {
                  ...prev.project,
                  posts: {
                    ...prev.project.posts,
                    pageInfo: {
                      ...prev.project.posts.pageInfo,
                      ...fetchMoreResult.project.posts.pageInfo,
                    },
                    edges: [...prev.project.posts.edges, ...fetchMoreResult.project.posts.edges],
                  },
                },
              }
            },
          })
          }
          hasMore={data.project.posts.pageInfo.hasNextPage}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
        >
          {data.project.posts.edges.map(({ node }) => (
            <Post data={node} key={node.id} withoutTitle />
          ))}
        </InfiniteScroll>
      </Right>
    </Layout>
  )
}

Project.getInitialProps = ({ query }) => query

export default Project
