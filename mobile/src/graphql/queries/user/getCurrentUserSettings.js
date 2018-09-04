import gql from 'graphql-tag'
import { pathOr } from 'ramda'
import { graphql } from 'react-apollo'
import userSettingsFragment from 'graphql/fragments/user/userSettings'
import userInfoFragment from 'graphql/fragments/user/userInfo'

export const getCurrentUserSettingsQuery = gql`
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
  getCurrentUserSettingsQuery,
  getCurrentUserSettingsOptions
)
