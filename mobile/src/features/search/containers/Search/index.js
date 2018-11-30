import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Dimensions, Keyboard } from 'react-native'
import { withNamespaces } from 'react-i18next'
import { TabView, TabBar, PagerExperimental } from 'react-native-tab-view'
import * as GestureHandler from 'react-native-gesture-handler'
import { SearchBar } from 'ui'
import { FONTS } from 'ui/constants'
import Users from '../../components/Users'
import Projects from '../../components/Projects'
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

  state = {
    index: 0, // eslint-disable-line
    routes, // eslint-disable-line
    query: '',
  }

  onChangeText = query => {
    this.setState({ query })
  }

  handleIndexChange = index => {
    Keyboard.dismiss()

    this.setState({ index }) // eslint-disable-line
  }

  scrollToTop = () => {
    this.userRef.scrollToOffset({ offset: 0 })
    this.projectRef.scrollToOffset({ offset: 0 })
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
    const { query } = this.state
    switch (route.key) {
      case 'users':
        return <Users scrollRef={el => (this.userRef = el)} query={query} />
      case 'projects':
        return <Projects scrollRef={el => (this.projectRef = el)} query={query} />
      default:
        return null
    }
  }

  renderPager = props => (
    <PagerExperimental GestureHandler={GestureHandler} swipeEnabled animationEnabled {...props} />
  )

  render() {
    return (
      <Fragment>
        <Base>
          <SearchBar placeholder={false} cancelButton onChangeText={this.onChangeText} />
        </Base>
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
      </Fragment>
    )
  }
}

export default withNamespaces('SearchTab')(Search)
