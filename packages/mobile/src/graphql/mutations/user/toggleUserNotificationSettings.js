import { mergeDeepRight } from 'ramda'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import userSettingsFragment from 'graphql/fragments/user/userSettings'

export const ToggleNotificationSettingsMutation = gql`
  mutation toggleNotificationSettings($input: ToggleNotificationSettingsInput) {
    toggleNotificationSettings(input: $input) {
      ...userSettings
    }
  }
  ${userSettingsFragment}
`

const toggleNotificationSettingsOptions = {
  props: ({ mutate, ownProps: { settings } }) => ({
    toggleNotificationSettings: input => {
      const { notificationType } = input

      const oldVal = settings.notifications.types[notificationType]
      const newSettings = mergeDeepRight(settings, {
        notifications: {
          types: {
            [notificationType]: !oldVal,
          },
        },
      })

      // TODO: Update
      return mutate({
        variables: { input },
        // optimisticResponse: {
        //   __typename: 'Mutation',
        //   toggleNotificationSettings: {
        //     // id: user.id,
        //     settings: {
        //       notifications: newSettings.notifications,
        //       __typename: 'UserSettings',
        //     },
        //     __typename: 'User',
        //   },
        // },
      })
    },
  }),
}

export default graphql(ToggleNotificationSettingsMutation, toggleNotificationSettingsOptions)
