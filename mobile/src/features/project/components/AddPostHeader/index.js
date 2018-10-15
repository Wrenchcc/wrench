import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { compose } from 'react-apollo'
import { getCurrentUserProjects } from 'graphql/queries/user/getCurrentUserProjects'
import { navigateBack, navigateToAddPost, navigateToFeed } from 'navigation'
import { Header, Dropdown, Icon, Text } from 'ui'
import SelectProject from 'features/project/components/SelectProject'
import { close, arrowLeft } from 'images'
import { Top } from './styles'

class AddPostHeader extends PureComponent {
  static propTypes = {
    changeProject: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired,
    selectedProjectIndex: PropTypes.number.isRequired,
    selectProjectOpen: PropTypes.bool.isRequired,
    showNavigateToFeed: PropTypes.bool,
    showNavigateToPost: PropTypes.bool,
    toggleSelectProject: PropTypes.func.isRequired,
  }

  renderHeaderRight() {
    const { t, showNavigateToPost, showNavigateToFeed } = this.props
    if (showNavigateToPost) {
      return (
        <Text color="white" medium onPress={() => navigateToAddPost()}>
          {t('AddPostHeader:next')}
        </Text>
      )
    }
    if (showNavigateToFeed) {
      return (
        <Text color="dark" medium onPress={() => navigateToFeed()}>
          {t('AddPostHeader:share')}
        </Text>
      )
    }
    return null
  }

  renderHeaderLeft() {
    const { showNavigateToFeed } = this.props
    if (showNavigateToFeed) {
      return <Icon onPress={() => navigateBack()} source={arrowLeft} />
    }
    return <Icon onPress={() => navigateBack()} source={close} />
  }

  render() {
    const {
      changeProject,
      projects,
      selectedProjectIndex,
      selectProjectOpen,
      showNavigateToFeed,
      toggleSelectProject,
    } = this.props

    return (
      <Fragment>
        <SelectProject
          expanded={selectProjectOpen}
          onPress={changeProject}
          projects={projects}
          selected={projects[selectedProjectIndex]}
        />
        <Top>
          <Header
            headerLeft={this.renderHeaderLeft()}
            headerRight={this.renderHeaderRight()}
            headerCenter={
              <Dropdown
                title={projects[selectedProjectIndex].node.title}
                onPress={toggleSelectProject}
                active={selectProjectOpen}
                darkMode={showNavigateToFeed}
              />
            }
          />
        </Top>
      </Fragment>
    )
  }
}

export default compose(
  getCurrentUserProjects,
  translate('AddPostHeader')
)(AddPostHeader)
