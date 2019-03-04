import gql from 'graphql-tag'
import userInfoSmall from '../user/userInfoSmall'

export default gql`
  fragment projectInfoSmall on Project {
    id
    title
    slug
    commentsDisabled
    user {
      ...userInfoSmall
    }
  }
  ${userInfoSmall}
`
