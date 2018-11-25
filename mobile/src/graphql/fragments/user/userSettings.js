import gql from 'graphql-tag'

export default gql`
  fragment userSettings on User {
    id
    settings {
      notifications {
        types {
          newFollower
          newComment
          newMention
          newArticle
          similarProjects
          productAnnouncements
        }
      }
    }
  }
`
