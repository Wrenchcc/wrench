import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated, InteractionManager } from 'react-native'
import withTranslation from 'i18n/withTranslation'
import { navigateToAddProject } from 'navigation-old/actions'
import { Text } from 'ui'
import Project from './Project'
import { Base, Scroll, NewProject, SPACER, BUTTON_HEIGHT, ITEM_HEIGHT } from './styles'

class SelectProject extends PureComponent {
  static propTypes = {
    expanded: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onPress: PropTypes.func.isRequired,
    projects: PropTypes.array,
    selectedProjectId: PropTypes.string.isRequired,
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

    return projects
      .slice()
      .sort((a, b) => a.node.files.edges.length > b.node.files.edges.length)
      .reverse()
      .map(({ node }) => (
        <Project
          key={node.id}
          {...node}
          onPress={onPress}
          selected={selectedProjectId === node.id}
        />
      ))
  }

  handleNewProject = () => {
    navigateToAddProject()
    InteractionManager.runAfterInteractions(() => {
      this.props.onClose()
    })
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
          <NewProject onPress={this.handleNewProject}>
            <Text medium>{t('SelectProject:create')}</Text>
          </NewProject>
        </Base>
      </Animated.View>
    )
  }
}

export default withTranslation('SelectProject')(SelectProject)
