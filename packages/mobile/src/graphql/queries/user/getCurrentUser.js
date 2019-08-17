import gql from 'graphql-tag'
import { pathOr } from 'ramda'
import { graphql } from 'react-apollo'
import { isRefetching, isFetchingMore } from 'graphql/utils/networkStatus'
import currentUserInfoFragment from 'graphql/fragments/user/currentUserInfo'
import userPostsConnectionFragment from 'graphql/fragments/user/postsConnection'
import projectsConnectionFragment from 'graphql/fragments/user/projectsConnection'

export const CurrentUserQuery = gql`
  query getCurrentUser {
    user: currentUser {
      ...currentUserInfo
      ...userProjectsConnection
    }
  }
  ${currentUserInfoFragment}
  ${projectsConnectionFragment}
`

export const CurrentUserProfileQuery = gql`
  query getCurrentUserProfile($after: String) {
    user: currentUser {
      ...currentUserInfo
      ...userPostsConnection
    }
  }
  ${currentUserInfoFragment}
  ${userPostsConnectionFragment}
`

const LoadMorePosts = gql`
  query loadMoreProjectPosts($after: String) {
    user: currentUser {
      ...userPostsConnection
    }
  }
  ${userPostsConnectionFragment}
`
