import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { navigateBack } from 'navigation'
import { Header, Dropdown, Icon, Text } from 'ui'
import SelectProject from 'features/project/components/SelectProject'
import { close, arrowLeftWhite } from 'images'
import { Top } from './styles'

class AddPostHeader extends PureComponent {
  static propTypes = {
    canEdit: PropTypes.bool.isRequired,
    changeProject: PropTypes.func.isRequired,
    dropdownOpen: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired,
    projects: PropTypes.array.isRequired,
    selectedProject: PropTypes.object.isRequired,
    toggleDropdown: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func.isRequired,
  }

  renderHeaderLeft() {
    if (this.props.isEditing) {
      return <Icon onPress={this.props.toggleEdit} source={arrowLeftWhite} />
    }
    return <Icon onPress={() => navigateBack()} source={close} />
  }

  renderHeaderRight() {
    if (this.props.canEdit && !this.props.isEditing) {
      return (
        <Text color="white" medium onPress={this.props.toggleEdit}>
          {this.props.t('AddPostHeader:next')}
        </Text>
      )
    }

    if (this.props.isEditing) {
      return (
        <Text color="white" medium onPress={() => console.log('post')}>
          {this.props.t('AddPostHeader:post')}
        </Text>
      )
    }

    return null
  }

  render() {
    const { selectedProject, projects, changeProject, toggleDropdown, dropdownOpen } = this.props

    return (
      <Fragment>
        <SelectProject
          expanded={dropdownOpen}
          onPress={changeProject}
          projects={projects}
          selected={selectedProject}
        />

        <Top>
          <Header
            headerLeft={this.renderHeaderLeft()}
            headerRight={this.renderHeaderRight()}
            headerCenter={
              <Dropdown
                title={selectedProject.title}
                onPress={toggleDropdown}
                active={dropdownOpen}
              />
            }
          />
        </Top>
      </Fragment>
    )
  }
}

export default translate('AddPostHeader')(AddPostHeader)
