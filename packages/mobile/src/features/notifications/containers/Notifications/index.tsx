import React, { useEffect } from 'react'
import { Navigation } from 'react-native-navigation'
import { compose } from 'rambda'
import { Layout, FlatList, showNotificationBadge, hideNotificationBadge } from 'navigation'
import { getNotifications } from 'graphql/queries/getNotifications'
import { markAllNotificationsSeen } from 'graphql/mutations/notification/markAllNotificationsSeen'
import { deleteNotification } from 'graphql/mutations/notification/deleteNotification'
import { Notification, EmptyState } from 'ui'
import { TYPES } from 'ui/EmptyState/constants'

function Notifications({
  notifications,
  fetchMore,
  refetch,
  isRefetching,
  isFetching,
  hasNextPage,
  deleteNotification: deleteNotificationMutation,
  componentId,
  markAllNotificationsSeen: markAllNotificationsSeenMutation,
  unreadCount,
}) {
  useEffect(() => {
    if (unreadCount > 0) {
      showNotificationBadge()
    }

    const componentAppearListener = Navigation.events().registerComponentDidAppearListener(
      ({ componentId: id }) => {
        if (componentId === id) {
          if (unreadCount > 0) {
            markAllNotificationsSeenMutation()
          }

          hideNotificationBadge()
        }
      }
    )

    return () => componentAppearListener.remove()
  }, [componentId, unreadCount])

  const renderItem = ({ item }) => (
    <Notification data={item.node} deleteNotification={deleteNotificationMutation} />
  )

  return (
    <Layout headerTitleKey="notifications">
      <FlatList
        tabIndex={2}
        paddingHorizontal={0}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={<EmptyState type={TYPES.NOTIFICATIONS} />}
        borderSeparator
        data={notifications}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
      />
    </Layout>
  )
}

export default compose(
  getNotifications,
  markAllNotificationsSeen,
  deleteNotification
)(Notifications)
