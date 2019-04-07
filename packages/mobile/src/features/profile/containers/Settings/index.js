import React, { PureComponent } from 'react'
import { SectionList } from 'react-native'
import PropTypes from 'prop-types'
import withTranslation from 'i18n/withTranslation'
import { Subscribe } from 'unstated'
import { compose } from 'react-apollo'
import { getCurrentUserSettings } from 'graphql-old/queries/user/getCurrentUserSettings'
import toggleUserNotificationSettingsMutation from 'graphql-old/mutations/user/toggleUserNotificationSettings'
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

const ITEM_HEIGHT = 60

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

  getItemLayout = (data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })

  renderItem = ({ item, index }) => (
    <SelectionItem key={index} {...item} title={this.props.t(`Settings:${item.titleKey}`)} />
  )

  render() {
    const { navigation, ...rest } = this.props

    return (
      <Subscribe to={[I18nContainer, AppContainer]}>
        {({ state, changeLocale }, { changeLoginState }) => (
          <SectionList
            contentContainerStyle={style.container}
            stickySectionHeadersEnabled={false}
            renderSectionHeader={this.renderSectionHeader}
            renderItem={this.renderItem}
            initialNumToRender={15}
            sections={
              sections({ ...state, changeLocale, changeLoginState, ...rest })[
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
  withTranslation('Settings')
)(Settings)
