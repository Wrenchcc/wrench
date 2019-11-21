import gql from 'graphql-tag'
import userSettingsFragment from 'graphql/fragments/user/userSettingsFragment'

export const TOGGLE_NOTIFICATION_SETTINGS_MUTATION = gql`
  mutation toggleNotificationSettings($input: ToggleNotificationSettingsInput) {
    toggleNotificationSettings(input: $input) {
      ...userSettingsFragment
    }
  }
  ${userSettingsFragment}
`
