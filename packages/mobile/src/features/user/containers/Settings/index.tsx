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
  const { t } = useTranslation()
  const { navigate, showModal } = useNavigation()

  const { data } = useCurrentUserSettingsQuery()
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

  const renderSectionHeader = useCallback(({ section: { titleKey } }) => {
    if (!titleKey) {
      return null
    }

    return <Title style={style.header}>{t(`Settings:${titleKey}`)}</Title>
  }, [])

  const renderItem = useCallback(
    ({ item, index }) => (
      <SelectionItem key={index} {...item} title={t(`Settings:${item.titleKey}`)} />
    ),
    []
  )

  const settings = data?.user.settings

  return (
    <Page headerTitle={t(`Settings:${section || 'settings'}`)} headerAnimation={false} view>
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
