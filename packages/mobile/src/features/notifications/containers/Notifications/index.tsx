import React, { useEffect } from 'react'
import { usePaginatedQuery, NotificationsDocument } from '@wrench/common'
import { Navigation } from 'react-native-navigation'
import ms from 'ms'
import { Layout, FlatList, showNotificationBadge, hideNotificationBadge } from 'navigation'
// import { deleteNotification } from 'services/graphql/mutations/notification/deleteNotification'
import { Notification, EmptyState } from 'ui'
import { TYPES } from 'ui/EmptyState/constants'

function Notifications({
  componentId,
  // deleteNotification: deleteNotificationMutation,
  // markAllNotificationsSeen: markAllNotisficationsSeenMutation,
}) {
  const deleteNotificationMutation = () => {}
  const { data, isFetching, fetchMore, isRefetching, hasNextPage, refetch } = usePaginatedQuery([
    'notifications',
  ])(NotificationsDocument, {
    options: {
      pollInterval: ms('1m'),
    },
  })

  useEffect(() => {
    if (data && data.unreadCount > 0) {
      showNotificationBadge()
    }

    const componentAppearListener = Navigation.events().registerComponentDidAppearListener(
      ({ componentId: id }) => {
        if (componentId === id) {
          if (data && data.unreadCount > 0) {
            // s()
          }

          hideNotificationBadge()
        }
      }
    )

    return () => componentAppearListener.remove()
  }, [componentId, data])

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
        data={data}
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

export default Notifications
