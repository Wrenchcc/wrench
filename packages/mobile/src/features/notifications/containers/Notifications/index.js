import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import withTranslation from 'i18n/withTranslation'
import { compose } from 'react-apollo'
import { getNotifications } from 'graphql-old/queries/getNotifications'
import { markAllNotificationsSeen } from 'graphql-old/mutations/notification/markAllNotificationsSeen'
import { deleteNotification } from 'graphql-old/mutations/notification/deleteNotification'
import { InfiniteListWithHandler, Notification, EmptyState } from 'ui'
import { TYPES } from 'ui/EmptyState/constants'
import { Header } from './styles'

class Notifications extends PureComponent {
  static propTypes = {
    deleteNotification: PropTypes.func.isRequired,
    fetchMore: PropTypes.func.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    markAllNotificationsSeen: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    notifications: PropTypes.array,
    refetch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    // props.navigation.addListener('willFocus', () => {
    //   props.markAllNotificationsSeen()
    // })
  }

  renderItem = ({ item }) => (
    <Notification data={item.node} deleteNotification={this.props.deleteNotification} />
  )

  render() {
    const {
      notifications,
      fetchMore,
      refetch,
      isRefetching,
      isFetching,
      hasNextPage,
      t,
    } = this.props

    const hasNotifications = notifications && notifications.length > 0

    return (
      <InfiniteListWithHandler
        paddingHorizontal={0}
        contentContainerStyle={{ flex: hasNotifications ? 0 : 1 }}
        defaultPaddingTop
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
        keyExtractor={item => item.node.id}
        renderItem={this.renderItem}
      />
    )
  }
}

export default compose(
  getNotifications,
  markAllNotificationsSeen,
  deleteNotification,
  withTranslation('Notifications')
)(Notifications)
