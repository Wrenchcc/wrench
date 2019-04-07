import gql from 'graphql-tag'
import userInfoFragment from 'graphql-old/fragments/user/userInfo'
import commentsConnectionFragment from 'graphql-old/fragments/post/commentsConnection'
import postInfoFragment from 'graphql-old/fragments/post/postInfo'

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
