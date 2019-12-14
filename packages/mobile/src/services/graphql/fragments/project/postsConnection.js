import gql from 'graphql-tag'
import userInfoFragment from 'services/graphql/fragments/user/userInfo'
import commentsConnectionFragment from 'services/graphql/fragments/post/commentsConnection'

export default gql`
  fragment projectPostsConnection on Project {
    posts: postsConnection(first: 5, after: $after) @connection(key: "posts") {
      edges {
        cursor
        node {
          id
          caption
          createdAt
          permissions {
            isOwner
          }
          user {
            ...userInfo
          }
          files: filesConnection(type: IMAGE) {
            edges {
              node {
                type
                id
                uri
              }
            }
          }
          project {
            id
            title
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
  ${commentsConnectionFragment}
`
