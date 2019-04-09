import gql from 'graphql-tag'
import { pathOr } from 'ramda'
import { graphql } from 'react-apollo'
import userSettingsFragment from 'graphql-old/fragments/user/userSettings'
import userInfoFragment from 'graphql-old/fragments/user/userInfo'

export const CurrentUserSettingsQuery = gql`
  query getCurrentUserSettings {
    user: currentUser {
      ...userInfo
      ...userSettings
    }
  }
  ${userInfoFragment}
  ${userSettingsFragment}
`

const getCurrentUserSettingsOptions = {
  props: ({ data }) => ({
    user: pathOr(null, ['user'], data),
    settings: pathOr(null, ['user', 'settings'], data),
  }),
}

export const getCurrentUserSettings = graphql(
  CurrentUserSettingsQuery,
  getCurrentUserSettingsOptions
)
