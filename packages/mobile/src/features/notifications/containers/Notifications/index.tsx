import React, { useCallback, useEffect } from 'react'
import {
  usePaginatedQuery,
  NotificationsDocument,
  UnreadNotificationsDocument,
  useDeleteNotificationMutation,
  useMarkAllNotificationsSeenMutation,
} from '@wrench/common'
import { getUnreadNotifications } from 'gql'
import {
  Layout,
  FlatList,
  useScrollToTop,
  withScrollableContext,
  SCREENS,
  useNavigation,
} from 'navigation'
import { Notification, EmptyState } from 'ui'
import { TYPES } from 'ui/EmptyState/constants'
import NotificationSkeletonList from 'ui/Notification/SkeletonList'

function Notifications() {
  const [markAllNotificationsSeen] = useMarkAllNotificationsSeenMutation()
  const [deleteNotification] = useDeleteNotificationMutation()
  const { hideNotificationBadge } = useNavigation()

  useScrollToTop(SCREENS.NOTIFICATIONS)

  const handleDeleteNotification = useCallback((id) => {
    deleteNotification({
      variables: {
        id,
      },
      update: (cache) => {
        const data = cache.readQuery({ query: NotificationsDocument })

        const edges = data.notifications.edges.filter((edge) => edge.node.id !== id)

        cache.writeQuery({
          query: NotificationsDocument,
          data: {
            ...data,
            notifications: {
              ...data.notifications,
              edges,
            },
          },
        })
      },
    })
  }, [])

  const {
    data: { edges },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedQuery(['notifications'])(NotificationsDocument)

  useEffect(() => {
    async function getNotifications() {
      const unreadCount = await getUnreadNotifications({
        fetchPolicy: 'cache-only',
      })

      if (unreadCount > 0) {
        markAllNotificationsSeen({
          update: (cache) => {
            cache.writeQuery({
              query: UnreadNotificationsDocument,
              data: {
                unreadNotifications: {
                  unreadCount: 0,
                },
              },
            })
          },
        })
      }

      hideNotificationBadge()
    }

    getNotifications()
  }, [])

  const renderItem = ({ item }) => (
    <Notification data={item.node} deleteNotification={handleDeleteNotification} />
  )

  const ListEmptyComponent =
    isFetching && !edges ? <NotificationSkeletonList /> : <EmptyState type={TYPES.NOTIFICATIONS} />

  return (
    <Layout headerTitleKey="notifications">
      <FlatList
        paddingHorizontal={0}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={ListEmptyComponent}
        borderSeparator
        data={edges}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
      />
    </Layout>
  )
}

export default withScrollableContext(Notifications)
