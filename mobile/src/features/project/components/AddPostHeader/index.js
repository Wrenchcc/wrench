import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { navigateBack, navigateToAddCaption } from 'navigation'
import { Header, Dropdown, Icon, Text } from 'ui'
import SelectProject from 'features/project/components/SelectProject'
import { close } from 'images'
import { Top } from './styles'

class AddPostHeader extends PureComponent {
  static propTypes = {
    canGoToCaption: PropTypes.bool.isRequired,
    changeProject: PropTypes.func.isRequired,
    dropdownOpen: PropTypes.bool.isRequired,
    selectedFiles: PropTypes.array.isRequired,
    projects: PropTypes.array.isRequired,
    selectedProject: PropTypes.object.isRequired,
    toggleDropdown: PropTypes.func.isRequired,
  }

  renderHeaderRight() {
    const { t, canGoToCaption, selectedProject, selectedFiles } = this.props
    if (canGoToCaption) {
      return (
        <Text
          color="white"
          medium
          onPress={() => navigateToAddCaption({
            selectedProject,
            selectedFiles,
          })
          }
        >
          {t('AddPostHeader:next')}
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
            headerLeft={<Icon onPress={() => navigateBack()} source={close} />}
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
