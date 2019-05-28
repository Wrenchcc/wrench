import React from 'react'
import { useTranslation } from 'react-i18next'
import { PageLayout, SectionList } from 'navigation'
import { Subscribe } from 'unstated'
import { compose } from 'react-apollo'
import { getCurrentUserSettings } from 'graphql/queries/user/getCurrentUserSettings'
import toggleUserNotificationSettingsMutation from 'graphql/mutations/user/toggleUserNotificationSettings'
import { Title, SelectionItem } from 'ui'
import { I18nContainer } from 'store'
import Footer from '../../components/Footer'
import sections from '../../sections'

const style = {
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
    marginTop: 40,
  },
}

function Settings({ section, ...rest }) {
  const { t } = useTranslation()

  return (
    <Subscribe to={[I18nContainer]}>
      {({ state, changeLocale }) => (
        <PageLayout headerTitle={t(`Settings:${section || 'settings'}`)} headerAnimation={false}>
          <SectionList
            contentContainerStyle={style.container}
            stickySectionHeadersEnabled={false}
            renderSectionHeader={({ section }) => {
              if (!section.titleKey) return null

              return <Title style={style.header}>{t(`Settings:${section.titleKey}`)}</Title>
            }}
            renderItem={({ item, index }) => (
              <SelectionItem key={index} {...item} title={t(`Settings:${item.titleKey}`)} />
            )}
            initialNumToRender={15}
            sections={sections({ ...state, changeLocale, ...rest })[section || 'settings']}
            keyExtractor={(item, index) => item + index}
            ListFooterComponent={!section && <Footer />}
          />
        </PageLayout>
      )}
    </Subscribe>
  )
}

export default compose(
  getCurrentUserSettings,
  toggleUserNotificationSettingsMutation
)(Settings)
