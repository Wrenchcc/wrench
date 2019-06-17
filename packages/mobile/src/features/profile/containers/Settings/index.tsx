import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Page, SectionList } from 'navigation'
import { compose } from 'react-apollo'
import { getCurrentUserSettings } from 'graphql/queries/user/getCurrentUserSettings'
import toggleUserNotificationSettingsMutation from 'graphql/mutations/user/toggleUserNotificationSettings'
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

function Settings({ section, toggleNotificationSettings, settings }) {
  const { t } = useTranslation()

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

  return (
    <Page headerTitle={t(`Settings:${section || 'settings'}`)} headerAnimation={false}>
      <SectionList
        contentContainerStyle={style.container}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        initialNumToRender={15}
        sections={sections({ toggleNotificationSettings, settings })[section || 'settings']}
        keyExtractor={keyExtractor}
        ListFooterComponent={!section && <Footer />}
        borderSeparator
      />
    </Page>
  )
}

export default compose(
  getCurrentUserSettings,
  toggleUserNotificationSettingsMutation
)(Settings)
