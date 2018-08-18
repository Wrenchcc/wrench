import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native'
import withLocalization from 'i18n/withLocalization'
import { navigateToEditProject } from 'navigation'
import { Text } from 'ui'
import Project from './Project'
import { Base, NewProject, SPACER, BUTTON_HEIGHT } from './styles'

const ITEM_HEIGHT = 65

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.expanded !== this.props.expanded) {
      this.toggleAnimation(nextProps.expanded)
    }
  }

  getHeight = () => Object.keys(this.props.projects).length * ITEM_HEIGHT + BUTTON_HEIGHT + SPACER

  isSelected = project => project.id === this.props.selected.id

  toggleAnimation = expanded => {
    Animated.spring(this.state.height, {
      toValue: expanded ? this.getHeight() : 0,
      bounciness: 0,
      speed: 7,
    }).start()
  }

  renderProjects = () => {
    const { projects, onPress } = this.props

    return projects.map(({ node }) => (
      <Project key={node.id} {...node} onPress={onPress} selected={this.isSelected(node)} />
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
          zIndex: 99,
          height: this.state.height,
        }}
      >
        <Base>
          {this.renderProjects()}
          <NewProject onPress={() => navigateToEditProject()}>
            <Text medium>{t('.create')}</Text>
          </NewProject>
        </Base>
      </Animated.View>
    )
  }
}

export default withLocalization(SelectProject, 'SelectProject')
