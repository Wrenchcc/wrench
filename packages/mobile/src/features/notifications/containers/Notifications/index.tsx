import React, { useCallback, useEffect, useState } from 'react'
import { Navigation } from 'react-native-navigation'
import {
  usePaginatedLazyQuery,
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
  TABS_INDEX,
} from 'navigation'
import { Notification, EmptyState } from 'ui'
import { TYPES } from 'ui/EmptyState/constants'
import NotificationSkeletonList from 'ui/Notification/SkeletonList'

function Notifications() {
  const [isRefetchingLocal, setRefresh] = useState(false)
  const [tabPressed, setTabPressed] = useState(false)
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
    loadData,
    data: { edges },
    isFetching,
    fetchMore,
    isRefetching,
    hasNextPage,
    refetch,
  } = usePaginatedLazyQuery(['notifications'])(NotificationsDocument, {
    onCompleted: () => setTabPressed(false), // NOTE: This is a hack because refetch is triggered on loadData
  })

  useEffect(() => {
    if (!tabPressed) {
      setRefresh(!!isRefetching)
    }
  }, [isRefetching, tabPressed])

  // NOTE: Without this hack the refresh jumps around
  const onRefresh = useCallback(() => {
    if (refetch) {
      setRefresh(true)
      refetch()
    }
  }, [refetch])

  useEffect(() => {
    async function handleNotificationBadge() {
      const unreadCount = await getUnreadNotifications({
        fetchPolicy: 'cache-only',
      })

      if (unreadCount) {
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

      return unreadCount
    }

    // NOTE: on first mount
    // registerBottomTabPressedListener is not triggered on render
    handleNotificationBadge()
    loadData()

    const bottomTabPressedListener = Navigation.events().registerBottomTabPressedListener(
      async ({ tabIndex }) => {
        if (tabIndex === TABS_INDEX.NOTIFICATIONS) {
          const unreadCount = await handleNotificationBadge()
          if (unreadCount) {
            // NOTE: Get latest data
            setTabPressed(true)
            loadData()
          }
        }
      }
    )

    return () => bottomTabPressedListener.remove()
  }, [])

  const renderItem = ({ item }) => (
    <Notification data={item.node} deleteNotification={handleDeleteNotification} />
  )

  const ListEmptyComponent = isFetching ? (
    <NotificationSkeletonList />
  ) : (
    <EmptyState type={TYPES.NOTIFICATIONS} style={{ paddingHorizontal: 20, marginTop: -100 }} />
  )

  return (
    <Layout headerTitleKey="notifications">
      <FlatList
        paddingHorizontal={0}
        ListEmptyComponent={ListEmptyComponent}
        borderSeparator
        ItemSeparatorComponentStyle={{ paddingTop: 15, marginBottom: 15 }}
        contentContainerStyle={{ flexGrow: 1 }}
        data={edges}
        refetch={onRefresh}
        fetchMore={fetchMore}
        isRefetching={isRefetchingLocal}
        isFetching={edges && isFetching}
        hasNextPage={hasNextPage}
        renderItem={renderItem}
      />
    </Layout>
  )
}

export default withScrollableContext(Notifications)
