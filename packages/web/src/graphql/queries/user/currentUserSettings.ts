import gql from 'graphql-tag'
import userSettingsFragment from 'graphql/fragments/user/userSettingsFragment'

export const CURRENT_USER_SETTINGS_QUERY = gql`
  query getCurrentUserSettings {
    user: currentUser {
      ...userSettingsFragment
    }
  }
  ${userSettingsFragment}
`
