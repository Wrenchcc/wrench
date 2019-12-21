import gql from 'graphql-tag'
import userInfoFragment from 'services/graphql/fragments/user/userInfo'
import commentsConnectionFragment from 'services/graphql/fragments/post/commentsConnection'
import postInfoFragment from 'services/graphql/fragments/post/postInfo'

export default gql`
  fragment feedPostsConnection on Feed {
    posts: postsConnection(after: $after) @connection(key: "posts") {
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
