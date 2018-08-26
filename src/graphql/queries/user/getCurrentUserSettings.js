import gql from 'graphql-tag'
import { pathOr } from 'ramda'
import { graphql } from 'react-apollo'
import { isFetchingMore } from 'graphql/utils/networkStatus'
import userSettingsFragment from 'graphql/fragments/user/userSettings'
import userInfoFragment from 'graphql/fragments/user/userInfo'

// TODO: Remove overfetch data, don't need userInfo here?
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
  props: ({ data, loading, networkStatus }) => ({
    isFetching: loading || isFetchingMore(networkStatus),
    notifications: pathOr(null, ['user', 'settings', 'notifications'], data),
  }),
}

export const getCurrentUserSettings = graphql(
  getCurrentUserSettingsQuery,
  getCurrentUserSettingsOptions
)
