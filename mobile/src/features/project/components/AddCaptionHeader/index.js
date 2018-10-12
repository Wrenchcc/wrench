import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { navigateBack } from 'navigation'
import { Header, Dropdown, Icon, Text } from 'ui'
import SelectProject from 'features/project/components/SelectProject'
import { arrowLeft } from 'images'
import { Top } from './styles'

class AddCaptionHeader extends PureComponent {
  static propTypes = {
    addPost: PropTypes.func.isRequired,
    changeProject: PropTypes.func.isRequired,
    dropdownOpen: PropTypes.bool.isRequired,
    projects: PropTypes.array.isRequired,
    selectedProject: PropTypes.object.isRequired,
    toggleDropdown: PropTypes.func.isRequired,
  }

  renderHeaderRight() {
    const { t, addPost } = this.props
    return (
      <Text color="dark" medium onPress={addPost}>
        {t('AddCaptionHeader:share')}
      </Text>
    )
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
            headerLeft={<Icon onPress={() => navigateBack()} source={arrowLeft} />}
            headerRight={this.renderHeaderRight()}
            headerCenter={
              <Dropdown
                darkMode
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

export default translate('AddCaptionHeader')(AddCaptionHeader)
