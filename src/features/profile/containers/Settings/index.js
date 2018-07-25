import React from 'react'
import { SectionList } from 'react-native'
import PropTypes from 'prop-types'
import withLocalization from 'i18n/withLocalization'
import { Title, SelectionItem } from 'ui'
import Footer from '../../components/Footer'
import sections from '../../sections'

const Settings = ({ navigation, t }) => (
  <SectionList
    contentContainerStyle={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 40 }}
    stickySectionHeadersEnabled={false}
    renderSectionHeader={({ section }) => section.titleKey && (
        <Title style={{ marginBottom: 20, marginTop: 40 }}>{t(`.${section.titleKey}`)}</Title>
    )
    }
    renderItem={({ item, index }) => (
      <SelectionItem key={index} {...item} title={t(`.${item.titleKey}`)} />
    )}
    sections={sections[navigation.state.routeName]}
    keyExtractor={(item, index) => item + index}
    ListFooterComponent={navigation.state.routeName === 'settings' && <Footer />}
  />
)

Settings.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default withLocalization(Settings, 'Settings')
