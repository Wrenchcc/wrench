import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useCurrentUserSettingsQuery } from '@wrench/common'
import { Page, SectionList } from 'navigation'
import { useMutation, TOGGLE_NOTIFICATION_SETTINGS_MUTATION } from 'services/gql'
import { Title, SelectionItem } from 'ui'
import Footer from '../../components/Footer'
import sections from '../../sections'

const style = {
  container: {
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    marginBottom: 20,
    marginTop: 40,
  },
}

const keyExtractor = (item, index) => item + index

function Settings({ section }) {
  const { t } = useTranslation()

  const { data } = useCurrentUserSettingsQuery()
  const [toggleNotificationSettings] = useMutation(TOGGLE_NOTIFICATION_SETTINGS_MUTATION)

  const handleToggleNotificationSettings = useCallback(
    input =>
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

  const settings = data && data.user.settings

  return (
    <Page headerTitle={t(`Settings:${section || 'settings'}`)} headerAnimation={false}>
      <SectionList
        contentContainerStyle={style.container}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        initialNumToRender={15}
        sections={sections({ handleToggleNotificationSettings, settings })[section || 'settings']}
        keyExtractor={keyExtractor}
        ListFooterComponent={!section && <Footer />}
        borderSeparator
      />
    </Page>
  )
}

export default Settings
