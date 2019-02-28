import gql from 'graphql-tag'

export default gql`
  fragment userInfoSmall on User {
    id
    username
    avatarUrl
  }
`
