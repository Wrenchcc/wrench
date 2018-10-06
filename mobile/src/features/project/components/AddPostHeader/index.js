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
    addPost: PropTypes.func.isRequired,
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
    const { isEditing, toggleEdit } = this.props
    if (isEditing) {
      return <Icon onPress={toggleEdit} source={arrowLeftWhite} />
    }
    return <Icon onPress={() => navigateBack()} source={close} />
  }

  renderHeaderRight() {
    const { t, addPost, canEdit, isEditing, toggleEdit } = this.props
    if (canEdit && !isEditing) {
      return (
        <Text color="white" medium onPress={toggleEdit}>
          {t('AddPostHeader:next')}
        </Text>
      )
    }

    if (isEditing) {
      return (
        <Text color="white" medium onPress={addPost}>
          {t('AddPostHeader:post')}
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
