import React from 'react'
import { View } from 'react-native'
import { Query } from 'react-apollo'
import { pathOr } from 'ramda'
import { CurrentUserUnreadNotificationsQuery } from 'graphql/queries/user/getCurrentUser'
import { COLORS } from 'ui/constants'

export default function Badge() {
  return (
    <Query query={CurrentUserUnreadNotificationsQuery}>
      {({ data }) => {
        if (pathOr(0, ['user', 'unreadNotifications'], data) > 0) {
          return (
            <View
              style={{
                zIndex: 10,
                marginRight: -12,
                marginBottom: -8,
                width: 13,
                height: 13,
                borderRadius: 13,
                backgroundColor: COLORS.ORANGE,
                borderWidth: 3,
                borderStyle: 'solid',
                borderColor: COLORS.BLACK,
              }}
            />
          )
        }

        return null
      }}
    </Query>
  )
}
