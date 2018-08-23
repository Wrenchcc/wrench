import React, { PureComponent } from 'react'
import { SectionList } from 'react-native'
import PropTypes from 'prop-types'
import withLocalization from 'i18n/withLocalization'
import { Title, SelectionItem } from 'ui'
import { AppStateConsumer } from 'AppState'
import Footer from '../../components/Footer'
import sections from '../../sections'

class Settings extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  renderSectionHeader = ({ section }) => {
    if (!section.titleKey) return null

    return (
      <Title style={{ marginBottom: 20, marginTop: 40 }}>
        {this.props.t(`.${section.titleKey}`)}
      </Title>
    )
  }

  renderItem = ({ item, index }) => (
    <SelectionItem key={index} {...item} title={this.props.t(`.${item.titleKey}`)} />
  )

  render() {
    const { navigation } = this.props
    return (
      <AppStateConsumer>
        {({ handleLoginState }) => (
          <SectionList
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 40 }}
            stickySectionHeadersEnabled={false}
            renderSectionHeader={this.renderSectionHeader}
            renderItem={this.renderItem}
            sections={sections(handleLoginState)[navigation.state.routeName]}
            keyExtractor={(item, index) => item + index}
            ListFooterComponent={navigation.state.routeName === 'settings' && <Footer />}
          />
        )}
      </AppStateConsumer>
    )
  }
}

export default withLocalization(Settings, 'Settings')
