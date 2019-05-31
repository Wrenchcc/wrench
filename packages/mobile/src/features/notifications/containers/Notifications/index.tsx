import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { compose } from 'react-apollo'
import { Navigation } from 'react-native-navigation'
import { Layout, FlatList } from 'navigation'
import { getNotifications } from 'graphql/queries/getNotifications'
import { markAllNotificationsSeen } from 'graphql/mutations/notification/markAllNotificationsSeen'
import { deleteNotification } from 'graphql/mutations/notification/deleteNotification'
import { Notification, EmptyState } from 'ui'
import { TYPES } from 'ui/EmptyState/constants'
import { Header } from './styles'

function Notifications({
  notifications,
  fetchMore,
  refetch,
  isRefetching,
  isFetching,
  hasNextPage,
  deleteNotification,
  componentId,
  markAllNotificationsSeen,
}) {
  const { t } = useTranslation()

  useEffect(() => {
    const componentAppearListener = Navigation.events().registerComponentDidAppearListener(
      ({ componentId: compId }) => {
        if (componentId === compId) {
          markAllNotificationsSeen()
        }
      }
    )

    return () => componentAppearListener.remove()
  }, [])

  const hasNotifications = notifications && notifications.length > 0

  return (
    <Layout>
      <FlatList
        tabIndex={2}
        initialNumToRender={6}
        paddingHorizontal={0}
        contentContainerStyle={{ flex: hasNotifications ? 0 : 1 }}
        ListHeaderComponent={
          <Header medium spacingHorizontal={!hasNotifications}>
            {t('Notifications:title')}
          </Header>
        }
        ListEmptyComponent={<EmptyState type={TYPES.NOTIFICATIONS} />}
        borderSeparator
        data={notifications}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        renderItem={({ item }) => (
          <Notification data={item.node} deleteNotification={deleteNotification} />
        )}
      />
    </Layout>
  )
}

export default compose(
  getNotifications,
  markAllNotificationsSeen,
  deleteNotification
)(Notifications)
