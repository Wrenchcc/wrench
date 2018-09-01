import gql from 'graphql-tag'
import userInfoFragment from 'graphql/fragments/user/userInfo'
import projectInfoFragment from 'graphql/fragments/project/projectInfo'
import commentConnectionFragment from 'graphql/fragments/post/commentConnection'

export default gql`
  fragment postsInfo on PostConnection {
    edges {
      cursor
      node {
        id
        caption
        user {
          ...userInfo
        }
        images: imagesConnection {
          edges {
            node {
              id
              uri
            }
          }
        }
        project {
          ...projectInfo
        }
        ...commentPostConnection
      }
    }
    pageInfo {
      hasNextPage
    }
  }
  ${userInfoFragment}
  ${projectInfoFragment}
  ${commentConnectionFragment}
`
