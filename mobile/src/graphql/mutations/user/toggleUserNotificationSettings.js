import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import userSettingsFragment from 'graphql/fragments/user/userSettings'

// TODO: Optimistic ui update
export const toggleNotificationSettingsMutation = gql`
  mutation toggleNotificationSettings($input: ToggleNotificationSettingsInput) {
    toggleNotificationSettings(input: $input) {
      ...userSettings
    }
  }
  ${userSettingsFragment}
`

const toggleNotificationSettingsOptions = {
  props: ({ mutate }) => ({
    toggleNotificationSettings: input => mutate({
      variables: { input },
      optimisticResponse: {
        __typename: 'Mutation',
        toggleNotificationSettings: {
          settings: {
            notifications: {
              types: {
                newFollower: {
                  push: true,
                  __typename: 'NotificationKindSettings',
                },
                newComment: {
                  push: true,
                  __typename: 'NotificationKindSettings',
                },
                newMention: {
                  push: true,
                  __typename: 'NotificationKindSettings',
                },
                newArticle: {
                  push: true,
                  __typename: 'NotificationKindSettings',
                },
                similarProjects: {
                  push: true,
                  __typename: 'NotificationKindSettings',
                },
                productAnnouncements: {
                  push: true,
                  __typename: 'NotificationKindSettings',
                },
                __typename: 'NotificationSettingsType',
              },
              __typename: 'UserNotificationsSettings',
            },
            __typename: 'UserSettings',
          },
          __typename: 'User',
        },
      },
    }),
  }),
}

export default graphql(toggleNotificationSettingsMutation, toggleNotificationSettingsOptions)
