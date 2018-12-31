import gql from 'graphql-tag'

export default gql`
  fragment userSettings on User {
    id
    settings {
      notifications {
        types {
          NEW_FOLLOWER
          NEW_COMMENT
          NEW_MENTION
          NEW_ARTICLE
          SIMILAR_PROJECTS
          PRODUCT_ANNOUNCEMENTS
        }
      }
    }
  }
`
