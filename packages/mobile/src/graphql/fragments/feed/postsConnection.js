import gql from 'graphql-tag'
import userInfoFragment from 'graphql/fragments/user/userInfo'
import commentsConnectionFragment from 'graphql/fragments/post/commentsConnection'
import postInfoFragment from 'graphql/fragments/post/postInfo'

export default gql`
  fragment feedPostsConnection on Feed {
    posts: postsConnection(after: $after) {
      edges {
        cursor
        node {
          ...postInfo
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
  ${postInfoFragment}
  ${userInfoFragment}
  ${commentsConnectionFragment}
`
