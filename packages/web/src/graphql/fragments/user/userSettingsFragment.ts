import gql from 'graphql-tag'

export default gql`
  fragment userSettingsFragment on User {
    id
    settings {
      notifications {
        types {
          NEW_FOLLOWER {
            email
            push
          }
          NEW_COMMENT {
            email
            push
          }
          NEW_MENTION {
            email
            push
          }
          NEW_ARTICLE {
            email
            push
          }
          SIMILAR_PROJECTS {
            email
            push
          }
          PRODUCT_ANNOUNCEMENTS {
            email
            push
          }
        }
      }
    }
  }
`
