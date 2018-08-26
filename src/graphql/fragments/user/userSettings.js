import gql from 'graphql-tag'

export default gql`
  fragment userSettings on User {
    settings {
      notifications {
        types {
          newFollower {
            push
          }
          newComment {
            push
          }
          newMention {
            push
          }
          newArticle {
            push
          }
          similarProjects {
            push
          }
          productAnnouncements {
            push
          }
        }
      }
    }
  }
`
