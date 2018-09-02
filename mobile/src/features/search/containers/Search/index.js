import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Dimensions, Keyboard } from 'react-native'
import { translate } from 'react-i18next'
import { TabView, TabBar, PagerExperimental } from 'react-native-tab-view'
import * as GestureHandler from 'react-native-gesture-handler'
import { FONTS } from 'ui/constants'
import Users from '../../components/Users'
import Projects from '../../components/Projects'

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
}

const routes = [
  {
    key: 'users',
  },
  {
    key: 'projects',
  },
]

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
      getLabelText={({ route }) => this.props.t(`SearchTab:${route.key}`)}
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
    return (
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
    )
  }
}

export default translate('SearchTab')(Search)
