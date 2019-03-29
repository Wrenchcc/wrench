import { graphql } from 'react-apollo'
import { filter } from 'ramda'
import gql from 'graphql-tag'
import { track, events } from 'utils/analytics'
import postInfoFragment from 'graphql/fragments/post/postInfo'
import { FeedQuery } from 'graphql/queries/getFeed'
import { RecentPostsQuery } from 'graphql/queries/getExplore'
import { CurrentUserProfileQuery } from 'graphql/queries/user/getCurrentUser'
import { ProjectBySlugQuery } from 'graphql/queries/project/getProject'

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
        update: (proxy, { data: { deletePost } }) => {
          try {
            // Feed
            const feedData = proxy.readQuery({ query: FeedQuery })
            const feedEdges = filter(edge => edge.node.id !== id, feedData.feed.posts.edges)

            proxy.writeQuery({
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
            const recentPostsData = proxy.readQuery({ query: RecentPostsQuery })
            const recentPostsEdges = filter(
              edge => edge.node.id !== id,
              recentPostsData.posts.edges
            )

            proxy.writeQuery({
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
            const userData = proxy.readQuery({ query: CurrentUserProfileQuery })
            const userPostsEdges = filter(edge => edge.node.id !== id, userData.user.posts.edges)

            proxy.writeQuery({
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
          //     const projectData = proxy.readQuery({
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
          //     proxy.writeQuery({
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
