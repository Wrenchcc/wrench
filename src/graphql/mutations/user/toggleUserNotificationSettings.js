import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import userInfoFragment from 'graphql/fragments/user/userInfo'
import userSettingsFragment from 'graphql/fragments/user/userSettings'

// TODO: Optimistic ui update
export const toggleNotificationSettingsMutation = gql`
  mutation toggleNotificationSettings($input: ToggleNotificationSettingsInput) {
    toggleNotificationSettings(input: $input) {
      ...userInfo
      ...userSettings
    }
  }
  ${userInfoFragment}
  ${userSettingsFragment}
`

const toggleNotificationSettingsOptions = {
  props: ({ mutate }) => ({
    toggleNotificationSettings: input => mutate({
      variables: { input },
      // optimisticResponse: {
      //   __typename: 'Mutation',
      //   toggleNotificationSettings: {
      //     __typename: 'User',
      //     userSettings: {
      //       settings: {
      //         notifications: {
      //           types: input,
      //         },
      //       },
      //     },
      //   },
      // },
    }),
  }),
}

export default graphql(toggleNotificationSettingsMutation, toggleNotificationSettingsOptions)
