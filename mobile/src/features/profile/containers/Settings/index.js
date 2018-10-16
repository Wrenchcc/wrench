import React, { PureComponent } from 'react'
import { SectionList } from 'react-native'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'
import { Subscribe } from 'unstated'
import { compose } from 'react-apollo'
import { getCurrentUserSettings } from 'graphql/queries/user/getCurrentUserSettings'
import toggleUserNotificationSettingsMutation from 'graphql/mutations/user/toggleUserNotificationSettings'
import { Title, SelectionItem } from 'ui'
import { I18nContainer, AppContainer } from 'store'
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

class Settings extends PureComponent {
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerTitle: screenProps.t(`Settings:${navigation.state.routeName}`),
  })

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    notifications: PropTypes.object,
  }

  renderSectionHeader = ({ section }) => {
    if (!section.titleKey) return null

    return <Title style={style.header}>{this.props.t(`Settings:${section.titleKey}`)}</Title>
  }

  renderItem = ({ item, index }) => (
    <SelectionItem key={index} {...item} title={this.props.t(`Settings:${item.titleKey}`)} />
  )

  render() {
    const { navigation, ...rest } = this.props

    return (
      <Subscribe to={[I18nContainer, AppContainer]}>
        {({ state, changeLanguage }, { changeLoginState }) => (
          <SectionList
            contentContainerStyle={style.container}
            stickySectionHeadersEnabled={false}
            renderSectionHeader={this.renderSectionHeader}
            renderItem={this.renderItem}
            sections={
              sections({ ...state, changeLanguage, changeLoginState, ...rest })[
                navigation.state.routeName
              ]
            }
            keyExtractor={(item, index) => item + index}
            ListFooterComponent={navigation.state.routeName === 'settings' && <Footer />}
          />
        )}
      </Subscribe>
    )
  }
}

export default compose(
  getCurrentUserSettings,
  toggleUserNotificationSettingsMutation,
  withNamespaces('Settings')
)(Settings)
