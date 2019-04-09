import gql from 'graphql-tag'
import repliesConnectionFragment from 'graphql-old/fragments/comment/repliesConnection'
import userInfoFragment from 'graphql-old/fragments/user/userInfo'

export default gql`
  fragment commentInfo on Comment {
    id
    text
    createdAt
    user {
      ...userInfo
    }
    ...repliesConnection
  }

  ${userInfoFragment}
  ${repliesConnectionFragment}
`
