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
    notifications: pathOr(null, ['user', 'settings', 'notifications'], data),
  }),
}

export const getCurrentUserSettings = graphql(
  getCurrentUserSettingsQuery,
  getCurrentUserSettingsOptions
)
