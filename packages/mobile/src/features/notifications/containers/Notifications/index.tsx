import React, { useEffect, useCallback } from 'react'
import {
  usePaginatedQuery,
  NotificationsDocument,
  useMarkAllNotificationsSeenMutation,
  useDeleteNotificationMutation,
} from '@wrench/common'
import { Navigation } from 'react-native-navigation'
import ms from 'ms'
import {
  Layout,
  FlatList,
  useNavigation,
  useScrollToTop,
  withScrollableContext,
  SCREENS,
} from 'navigation'
import { Notification, EmptyState } from 'ui'
import { TYPES } from 'ui/EmptyState/constants'

function Notifications({ componentId }) {
  const [markAllNotificationsSeen] = useMarkAllNotificationsSeenMutation()
  const [deleteNotification] = useDeleteNotificationMutation()
  const { showNotificationBadge, hideNotificationBadge } = useNavigation()

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
    data: { edges, unreadCount },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedQuery(['notifications'])(NotificationsDocument, {
    pollInterval: ms('1m'),
  })

  useEffect(() => {
    if (unreadCount > 0) {
      showNotificationBadge()
    }

    const componentAppearListener = Navigation.events().registerComponentDidAppearListener(
      ({ componentId: id }) => {
        if (componentId === id) {
          if (unreadCount > 0) {
            markAllNotificationsSeen({
              update: (cache) => {
                const data = cache.readQuery({ query: NotificationsDocument })

                cache.writeQuery({
                  query: NotificationsDocument,
                  data: {
                    ...data,
                    notifications: {
                      ...data.notifications,
                      unreadCount: 0,
                    },
                  },
                })
              },
            })
          }

          hideNotificationBadge()
        }
      }
    )

    return () => componentAppearListener.remove()
  }, [componentId, unreadCount])

  const renderItem = ({ item }) => (
    <Notification data={item.node} deleteNotification={handleDeleteNotification} />
  )

  return (
    <Layout headerTitleKey="notifications">
      <FlatList
        paddingHorizontal={0}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={<EmptyState type={TYPES.NOTIFICATIONS} />}
        borderSeparator
        data={edges}
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

export default withScrollableContext(Notifications)
