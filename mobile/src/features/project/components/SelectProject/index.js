import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native'
import { withNamespaces } from 'react-i18next'
import { navigateToAddProject } from 'navigation'
import { Text } from 'ui'
import Project from './Project'
import { Base, Scroll, NewProject, SPACER, BUTTON_HEIGHT, ITEM_HEIGHT } from './styles'

class SelectProject extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    expanded: PropTypes.bool.isRequired,
    selectedProjectId: PropTypes.string.isRequired,
    projects: PropTypes.array,
  }

  state = {
    height: new Animated.Value(0),
  }

  componentDidUpdate(prevProps) {
    if (this.props.expanded !== prevProps.expanded) {
      this.toggleAnimation(this.props.expanded)
    }
  }

  get getHeight() {
    const itemCount = Object.keys(this.props.projects).length
    const itemsHeight = itemCount >= 4 ? 4 : itemCount
    return itemsHeight * ITEM_HEIGHT + BUTTON_HEIGHT + SPACER
  }

  toggleAnimation = expanded => {
    Animated.spring(this.state.height, {
      toValue: expanded ? this.getHeight : 0,
      bounciness: 0,
      speed: 7,
    }).start()
  }

  renderProjects = () => {
    const { projects, onPress, selectedProjectId } = this.props

    return projects.map(({ node }) => (
      <Project key={node.id} {...node} onPress={onPress} selected={selectedProjectId === node.id} />
    ))
  }

  render() {
    const { t } = this.props
    return (
      <Animated.View
        style={{
          position: 'absolute',
          overflow: 'hidden',
          width: '100%',
          zIndex: 10,
          height: this.state.height,
        }}
      >
        <Base>
          <Scroll>{this.renderProjects()}</Scroll>
          <NewProject onPress={() => navigateToAddProject()}>
            <Text medium>{t('SelectProject:create')}</Text>
          </NewProject>
        </Base>
      </Animated.View>
    )
  }
}

export default withNamespaces('SelectProject')(SelectProject)
