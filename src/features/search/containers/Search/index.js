import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Dimensions, Keyboard, View } from 'react-native'
import { TabView, TabBar, PagerExperimental } from 'react-native-tab-view'
import * as GestureHandler from 'react-native-gesture-handler'
import withLocalization from 'i18n/withLocalization'
import { Search as SearchInput, Text } from 'ui'
import { FONTS } from 'ui/constants'
import { navigateBack } from 'navigation'
import { HEADER_HEIGHT } from 'navigation/constants'
import Users from '../../components/Users'
import Projects from '../../components/Projects'
import routes from './routes'

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
}

const styles = {
  tabBar: {
    backgroundColor: 'white',
    elevation: 0,
  },
  labelStyle: {
    color: 'black',
    fontSize: 17,
    fontFamily: FONTS.MEDIUM,
  },
  indicatorStyle: {
    backgroundColor: 'black',
    height: 3,
  },
}

class Search extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object,
  }

  state = { index: 0, routes } // eslint-disable-line

  handleIndexChange = index => {
    Keyboard.dismiss()

    this.setState({ index }) // eslint-disable-line
  }

  scrollToTop = () => {
    this.scrollView.scrollToOffset({ offset: 0 })
  }

  setRef = ref => {
    this.scrollView = ref
  }

  renderTabBar = props => (
    <TabBar
      {...props}
      style={styles.tabBar}
      labelStyle={styles.labelStyle}
      indicatorStyle={styles.indicatorStyle}
      getLabelText={({ route }) => route.title}
      swipeEnabled
      scrollEnabled={false}
      onTabPress={this.scrollToTop}
    />
  )

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'users':
        return <Users scrollRef={this.setRef} />
      case 'projects':
        return <Projects scrollRef={this.setRef} />
      default:
        return null
    }
  }

  renderPager = props => (
    <PagerExperimental GestureHandler={GestureHandler} swipeEnabled animationEnabled {...props} />
  )

  render() {
    const { t } = this.props

    // TODO: Fix correct hight
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: HEADER_HEIGHT,
            marginTop: 45,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}
        >
          <SearchInput placeholder={false} style={{ flex: 1, paddingRight: 20 }} />
          <Text onPress={() => navigateBack()} medium>
            {t('.cancel')}
          </Text>
        </View>
        <TabView
          navigationState={this.state}
          renderScene={this.renderScene}
          renderTabBar={this.renderTabBar}
          renderPager={this.renderPager}
          onIndexChange={this.handleIndexChange}
          initialLayout={initialLayout}
          swipeEnabled
          animationEnabled
          useNativeDriver
        />
      </View>
    )
  }
}

export default withLocalization(Search, 'SearchTab')
