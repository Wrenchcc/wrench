import React, { useCallback } from 'react'
import {
  usePaginatedQuery,
  NotificationsDocument,
  useDeleteNotificationMutation,
} from '@wrench/common'
import { Layout, FlatList, useScrollToTop, withScrollableContext, SCREENS } from 'navigation'
import { Notification, EmptyState } from 'ui'
import { TYPES } from 'ui/EmptyState/constants'
import NotificationSkeletonList from 'ui/Notification/SkeletonList'

function Notifications() {
  const [deleteNotification] = useDeleteNotificationMutation()

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
