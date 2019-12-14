import gql from 'graphql-tag'
import userInfoFragment from 'services/graphql/fragments/user/userInfo'
import projectInfoFragment from 'services/graphql/fragments/project/projectInfo'
import commentsConnectionFragment from 'services/graphql/fragments/post/commentsConnection'

export default gql`
  fragment userPostsConnection on User {
    posts: postsConnection(after: $after, first: 5) @connection(key: "posts") {
      edges {
        cursor
        node {
          id
          caption
          createdAt
          user {
            ...userInfo
          }
          permissions {
            isOwner
          }
          files: filesConnection(type: IMAGE) {
            edges {
              node {
                id
                type
                uri
              }
            }
          }
          project {
            ...projectInfo
          }
          likes {
            isLiked
            totalCount
          }
          ...commentPostConnection
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
  ${userInfoFragment}
  ${projectInfoFragment}
  ${commentsConnectionFragment}
`
