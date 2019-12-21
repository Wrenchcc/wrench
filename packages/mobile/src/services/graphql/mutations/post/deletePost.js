import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { track, events } from 'utils/analytics'
import postInfoFragment from 'services/graphql/fragments/post/postInfo'
import { FeedQuery } from 'services/graphql/queries/getFeed'
import { RecentPostsQuery } from 'services/graphql/queries/getExplore'
import { CurrentUserProfileQuery } from 'services/graphql/queries/user/getCurrentUser'
import { ProjectBySlugQuery } from 'services/graphql/queries/project/getProject'

const DeletePostMutation = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      ...postInfo
    }
  }
  ${postInfoFragment}
`

const deletePostOptions = {
  props: ({ mutate }) => ({
    deletePost: id => {
      track(events.POST_DELETED)

      return mutate({
        variables: {
          id,
        },
        update: (cache, { data: { deletePost } }) => {
          try {
            // Feed
            const feedData = cache.readQuery({ query: FeedQuery })
            const feedEdges = feedData.feed.posts.edges.filter(edge => edge.node.id !== id)

            cache.writeQuery({
              query: FeedQuery,
              data: {
                ...feedData,
                feed: {
                  ...feedData.feed,
                  posts: {
                    ...feedData.feed.posts,
                    edges: feedEdges,
                  },
                },
              },
            })
          } catch (err) {
            // Swollow error when no post is found
          }

          // Recent posts
          try {
            const recentPostsData = cache.readQuery({ query: RecentPostsQuery })
            const recentPostsEdges = recentPostsData.posts.edges.filter(edge => edge.node.id !== id)

            cache.writeQuery({
              query: RecentPostsQuery,
              data: {
                ...recentPostsData,
                posts: {
                  ...recentPostsData.posts,
                  edges: recentPostsEdges,
                },
              },
            })
          } catch (err) {
            // Swollow error when no post is found
          }

          // Current user
          try {
            const userData = cache.readQuery({ query: CurrentUserProfileQuery })
            const userPostsEdges = userData.user.posts.edges.filter(edge => edge.node.id !== id)

            cache.writeQuery({
              query: CurrentUserProfileQuery,
              data: {
                ...userData,
                user: {
                  ...userData.user,
                  posts: {
                    ...userData.user.posts,
                    edges: userPostsEdges,
                  },
                },
              },
            })
          } catch (err) {
            // Swollow error when no post is found
          }

          // Project
          //   try {
          //     const projectData = cache.readQuery({
          //       query: ProjectBySlugQuery,
          //       variables: {
          //         slug: deletePost.project.slug,
          //       },
          //     })
          //
          //     const projectPostsEdges = filter(
          //       edge => edge.node.id !== id,
          //       projectData.project.posts.edges
          //     )
          //
          //     cache.writeQuery({
          //       query: ProjectBySlugQuery,
          //       data: {
          //         ...projectData,
          //         project: {
          //           ...projectData.project,
          //           posts: {
          //             ...projectData.project.posts,
          //             edges: projectPostsEdges,
          //           },
          //         },
          //       },
          //     })
          //   } catch (err) {
          //     console.log(err)
          //     // Swollow error when no post is found
          //   }
        },
      })
    },
  }),
}

export const deletePost = graphql(DeletePostMutation, deletePostOptions)
