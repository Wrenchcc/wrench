import React from 'react'
import { View } from 'react-native'
import { Query } from 'react-apollo'
import { pathOr } from 'ramda'
import { NotificationsUnreadCountQuery } from 'graphql/queries/getNotifications'
import { COLORS } from 'ui/constants'

export default function Badge() {
  return (
    <Query query={NotificationsUnreadCountQuery}>
      {({ data }) => {
        if (pathOr(0, ['notifications', 'unreadCount'], data) > 0) {
          return (
            <View
              style={{
                position: 'absolute',
                zIndex: 10,
                right: -3,
                top: -4,
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
