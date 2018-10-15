import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native'
import { translate } from 'react-i18next'
import { navigateToEditProject } from 'navigation'
import { Text } from 'ui'
import Project from './Project'
import { Base, Scroll, NewProject, SPACER, BUTTON_HEIGHT, ITEM_HEIGHT } from './styles'

class SelectProject extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    expanded: PropTypes.bool.isRequired,
    selected: PropTypes.object.isRequired,
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

  isSelected = project => project.id === this.props.selected.id

  toggleAnimation = expanded => {
    Animated.spring(this.state.height, {
      toValue: expanded ? this.getHeight : 0,
      bounciness: 0,
      speed: 7,
    }).start()
  }

  renderProjects = () => {
    const { projects, onPress } = this.props

    return projects.map(({ node }, index) => (
      <Project
        key={node.id}
        {...node}
        onPress={onPress}
        selected={this.isSelected(node)}
        index={index}
      />
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
          <NewProject onPress={() => navigateToEditProject()}>
            <Text medium>{t('SelectProject:create')}</Text>
          </NewProject>
        </Base>
      </Animated.View>
    )
  }
}

export default translate('SelectProject')(SelectProject)
