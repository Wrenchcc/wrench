import gql from 'graphql-tag'

export default gql`
  fragment projectInfoSmall on Project {
    id
    title
    slug
    user {
      id
      fullName
      username
      isOnline
    }
  }
`
