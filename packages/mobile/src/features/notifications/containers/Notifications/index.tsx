import React, { useEffect, useRef } from 'react'
import { usePaginatedQuery, NotificationsDocument } from '@wrench/common'
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
// import { deleteNotification } from 'services/graphql/mutations/notification/deleteNotification'
import { Notification, EmptyState } from 'ui'
import { TYPES } from 'ui/EmptyState/constants'

function Notifications({
  componentId,
  // deleteNotification: deleteNotificationMutation,
  // markAllNotificationsSeen: markAllNotisficationsSeenMutation,
}) {
  const scrollRef = useRef()

  const deleteNotificationMutation = () => {}
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
            // s()
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
