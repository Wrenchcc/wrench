import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Dimensions, Keyboard } from 'react-native'
import withTranslation from 'i18n/withTranslation'
import { TabView, TabBar, PagerExperimental } from 'react-native-tab-view'
import * as GestureHandler from 'react-native-gesture-handler'
import { FONTS } from 'ui/constants'
import Users from './Users'
import Projects from './Projects'
import { Base } from './styles'

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
    fontSize: 15,
    fontFamily: FONTS.MEDIUM,
  },
  indicatorStyle: {
    backgroundColor: 'black',
    height: 3,
  },
}

class Search extends PureComponent {
  state = {
    index: 0, // eslint-disable-line
    routes, // eslint-disable-line
  }

  handleIndexChange = index => {
    Keyboard.dismiss()
    this.setState({ index }) // eslint-disable-line
  }

  scrollToTop = () => {
    if (this.userRef) this.userRef.scrollToOffset({ offset: 0 })
    if (this.projectRef) this.projectRef.scrollToOffset({ offset: 0 })
  }

  renderTabBar = props => (
    <TabBar
      {...props}
      style={styles.tabBar}
      labelStyle={styles.labelStyle}
      indicatorStyle={styles.indicatorStyle}
      getLabelText={({ route }) => this.props.t(`Search:${route.key}`)}
      swipeEnabled
      scrollEnabled={false}
      onTabPress={this.scrollToTop}
    />
  )

  // TODO: Search in active index only
  renderScene = ({ route }) => {
    switch (route.key) {
      case 'users':
        return <Users scrollRef={el => (this.userRef = el)} query={this.props.query} />
      case 'projects':
        return <Projects scrollRef={el => (this.projectRef = el)} query={this.props.query} />
      default:
        return null
    }
  }

  renderPager = props => (
    <PagerExperimental GestureHandler={GestureHandler} swipeEnabled animationEnabled {...props} />
  )

  render() {
    if (!this.props.active) return null

    return (
      <Base>
        <TabView
          navigationState={this.state}
          renderScene={this.renderScene}
          renderTabBar={this.renderTabBar}
          renderPager={this.renderPager}
          onIndexChange={this.handleIndexChange}
          initialLayout={initialLayout}
          swipeEnabled
          lazy
          animationEnabled
          useNativeDriver
        />
      </Base>
    )
  }
}

export default withTranslation('Search')(Search)
