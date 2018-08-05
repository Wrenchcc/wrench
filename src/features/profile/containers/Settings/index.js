import React, { PureComponent } from 'react'
import { SectionList } from 'react-native'
import PropTypes from 'prop-types'
import withLocalization from 'i18n/withLocalization'
import { Title, SelectionItem } from 'ui'
import Footer from '../../components/Footer'
import sections from '../../sections'

class Settings extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  renderSectionHeader = ({ section }) => section.titleKey && (
      <Title style={{ marginBottom: 20, marginTop: 40 }}>
        {this.props.t(`.${section.titleKey}`)}
      </Title>
  )

  renderItem = ({ item, index }) => (
    <SelectionItem key={index} {...item} title={this.props.t(`.${item.titleKey}`)} />
  )

  render() {
    const { navigation } = this.props
    return (
      <SectionList
        contentContainerStyle={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 40 }}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={this.renderSectionHeader}
        renderItem={this.renderItem}
        sections={sections[navigation.state.routeName]}
        keyExtractor={(item, index) => item + index}
        ListFooterComponent={navigation.state.routeName === 'settings' && <Footer />}
      />
    )
  }
}

export default withLocalization(Settings, 'Settings')
