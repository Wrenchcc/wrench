import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  useCurrentUserSettingsQuery,
  useToggleNotificationSettingsMutation,
  useDeleteCurrentUserMutation,
} from '@wrench/common'
import { Page, SectionList, useNavigation } from 'navigation'
import { Title, SelectionItem } from 'ui'
import Footer from '../../components/Footer'
import sections from '../../sections'

const style = {
  container: {
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: -40,
  },
  header: {
    marginBottom: 20,
    marginTop: 40,
  },
}

const keyExtractor = (item, index) => item + index

function Settings({ section }) {
  const { t } = useTranslation(['settings', 'languages'])
  const { navigate, showModal } = useNavigation()

  // t('notifications:NEW_FOLLOWER')
  // t('notifications:NEW_COMMENT')
  // t('notifications:NEW_MENTION')
  // t('notifications:NEW_ARTICLE')
  // t('notifications:SIMILAR_PROJECTS')
  // t('notifications:PRODUCT_ANNOUNCEMENTS')
  // t('notifications:PROJECT_UPDATES')

  // t('settings:invite')
  // t('settings:customize-interests')
  // t('settings:push-notifications')
  // t('settings:email-notifications')
  // t('settings:language')
  // t('settings:general')
  // t('settings:support')
  // t('settings:terms')
  // t('settings:website')
  // t('settings:credits')
  // t('settings:rate')
  // t('settings:logout')
  // t('settings:developer')
  // t('settings:clear')
  // t('settings:share')
  // t('settings:settings')

  // t('settings:delete')
  // t('settings:deleteTitle')
  // t('settings:deleteDescription')
  // t('settings:deleteCancel')
  // t('settings:deleteOk')
  // t('settings:stages.production')
  // t('settings:stages.staging')
  // t('settings:faq')
  // t('settings:report')
  // t('settings:facebook')
  // t('settings:contacts')
  // t('settings:membership')

  const { data, loading } = useCurrentUserSettingsQuery()

  const [toggleNotificationSettings] = useToggleNotificationSettingsMutation()
  const [deleteUser] = useDeleteCurrentUserMutation()

  const handleToggleNotificationSettings = useCallback(
    (input) =>
      toggleNotificationSettings({
        variables: {
          input,
        },
      }),
    [toggleNotificationSettings]
  )

  const renderSectionHeader = useCallback(({ section: { title } }) => {
    if (!title) {
      return null
    }

    return <Title style={style.header}>{title}</Title>
  }, [])

  const renderItem = useCallback(
    ({ item, index }) => <SelectionItem key={index} {...item} title={item.title} />,
    []
  )

  if (!data?.user && loading) {
    return null
  }

  const settings = data?.user.settings

  return (
    <Page
      headerTitle={section ? t(`settings:${section}`) : t('settings')}
      headerAnimation={false}
      view
    >
      <SectionList
        contentContainerStyle={style.container}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        initialNumToRender={15}
        sections={
          sections({
            handleToggleNotificationSettings,
            settings,
            navigate,
            showModal,
            deleteUser,
            t,
            user: data?.user,
          })[section || 'settings']
        }
        keyExtractor={keyExtractor}
        ListFooterComponent={!section && <Footer />}
        borderSeparator
      />
    </Page>
  )
}

export default Settings
