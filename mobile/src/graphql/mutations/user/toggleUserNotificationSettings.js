import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import userSettingsFragment from 'graphql/fragments/user/userSettings'

export const toggleNotificationSettingsMutation = gql`
  mutation toggleNotificationSettings($input: ToggleNotificationSettingsInput) {
    toggleNotificationSettings(input: $input) {
      ...userSettings
    }
  }
  ${userSettingsFragment}
`
// deliveryMethod: 'push',
// notificationType: type,
// TODO: Optimistic ui update
// https://github.com/withspectrum/spectrum/blob/3d57bfd025c1891b7eee5297644e46bf5ea89593/api/mutations/user/toggleNotificationSettings.js
const toggleNotificationSettingsOptions = {
  props: ({ mutate, ownProps: { user } }) => ({
    toggleNotificationSettings: input => mutate({
      variables: { input },
      optimisticResponse: {
        __typename: 'Mutation',
        toggleNotificationSettings: {
          id: user.id,
          settings: {
            __typename: 'UserSettings',
          },
          __typename: 'User',
        },
      },
    }),
  }),
}

// notifications: {
//   types: {
//     newFollower: {
//       push: true,
//       __typename: 'NotificationKindSettings',
//     },
//     newComment: {
//       push: true,
//       __typename: 'NotificationKindSettings',
//     },
//     newMention: {
//       push: true,
//       __typename: 'NotificationKindSettings',
//     },
//     newArticle: {
//       push: true,
//       __typename: 'NotificationKindSettings',
//     },
//     similarProjects: {
//       push: true,
//       __typename: 'NotificationKindSettings',
//     },
//     productAnnouncements: {
//       push: true,
//       __typename: 'NotificationKindSettings',
//     },
//     __typename: 'NotificationSettingsType',
//   },
//   __typename: 'UserNotificationsSettings',
// },

export default graphql(toggleNotificationSettingsMutation, toggleNotificationSettingsOptions)
