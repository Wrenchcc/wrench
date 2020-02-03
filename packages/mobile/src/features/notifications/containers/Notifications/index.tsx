import React, { useEffect, useRef, useCallback } from 'react'
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
  SCREENS,
  showNotificationBadge,
  hideNotificationBadge,
  useScrollToTop,
} from 'navigation'
import { Notification, EmptyState } from 'ui'
import { TYPES } from 'ui/EmptyState/constants'

function Notifications({ componentId }) {
  const scrollRef = useRef()
  const [markAllNotificationsSeen] = useMarkAllNotificationsSeenMutation()
  const [deleteNotification] = useDeleteNotificationMutation()

  const handleDeleteNotification = useCallback(id => {
    deleteNotification({
      variables: {
        id,
      },
      update: cache => {
        const data = cache.readQuery({ query: NotificationsDocument })

        const edges = data.notifications.edges.filter(edge => edge.node.id !== id)

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
    options: {
      pollInterval: ms('1m'),
    },
  })

  useScrollToTop(scrollRef, SCREENS.NOTIFICATIONS)

  useEffect(() => {
    if (unreadCount > 0) {
      showNotificationBadge()
    }

    const componentAppearListener = Navigation.events().registerComponentDidAppearListener(
      ({ componentId: id }) => {
        if (componentId === id) {
          if (unreadCount > 0) {
            markAllNotificationsSeen({
              update: cache => {
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
        ref={scrollRef}
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

export default Notifications
