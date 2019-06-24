import gql from 'graphql-tag'
import { pathOr } from 'ramda'
import { graphql } from 'react-apollo'
import userSettingsFragment from 'graphql/fragments/user/userSettings'

export const CurrentUserSettingsQuery = gql`
  query getCurrentUserSettings {
    user: currentUser {
      ...userSettings
    }
  }
  ${userSettingsFragment}
`

const getCurrentUserSettingsOptions = {
  props: ({ data }) => ({
    settings: pathOr(null, ['user', 'settings'], data),
  }),
}

export const getCurrentUserSettings = graphql(
  CurrentUserSettingsQuery,
  getCurrentUserSettingsOptions
)
