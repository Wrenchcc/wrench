import React, { PureComponent } from 'react'
import { Keyboard } from 'react-native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'
import { FONTS } from 'ui/constants'
import People from '../People'
import Projects from '../Projects'
import routes from './routes'

const styles = {
  tabBar: {
    backgroundColor: 'white',
    elevation: 0,
  },
}

export default class Search extends PureComponent {
  state = {
    index: 0,
    routes,
  }

  onCange = index => {
    Keyboard.dismiss()
    this.setState({ index })
  }

  renderTabBar = props => (
    <TabBar
      {...props}
      style={styles.tabBar}
      labelStyle={{ color: 'black', fontSize: 17, fontFamily: FONTS.MEDIUM }}
      getLabelText={({ route }) => route.title}
      indicatorStyle={{
        backgroundColor: 'black',
        height: 3,
      }}
    />
  )

  renderScene = SceneMap({
    people: People,
    projects: Projects,
  })

  render = () => (
    <TabView
      navigationState={this.state}
      renderScene={this.renderScene}
      renderTabBar={this.renderTabBar}
      onIndexChange={this.onCange}
      useNativeDriver
    />
  )
}
