import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'
import { compose } from 'react-apollo'
import { getCurrentUserProjects } from 'graphql/queries/user/getCurrentUserProjects'
import { navigateBack, navigateToAddPost, navigateToFeed } from 'navigation'
import { Header, Dropdown, Icon, Text, ActionSheet } from 'ui'
import SelectProject from 'features/project/components/SelectProject'
import { close, arrowLeft } from 'images'
import { Backdrop, Top } from './styles'

class AddPostHeader extends PureComponent {
  state = {
    actionSheetIsOpen: false,
  }

  static propTypes = {
    changeProject: PropTypes.func.isRequired,
    closeSelectProject: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired,
    selectedProjectIndex: PropTypes.number.isRequired,
    selectProjectOpen: PropTypes.bool.isRequired,
    showNavigateToFeed: PropTypes.bool,
    hasSelectedFiles: PropTypes.bool,
    toggleSelectProject: PropTypes.func.isRequired,
  }

  toggleActionSheet = () => {
    this.setState(prevState => ({ actionSheetIsOpen: !prevState.actionSheetIsOpen }))
  }

  handleClose = () => {
    const { hasSelectedFiles } = this.props

    if (hasSelectedFiles) {
      this.toggleActionSheet()
    } else {
      navigateBack()
    }
  }

  renderHeaderRight() {
    const { t, hasSelectedFiles, showNavigateToFeed } = this.props

    if (hasSelectedFiles) {
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
    return <Icon onPress={this.handleClose} source={close} />
  }

  render() {
    const { actionSheetIsOpen } = this.state
    const {
      changeProject,
      closeSelectProject,
      projects,
      selectedProjectIndex,
      selectProjectOpen,
      showNavigateToFeed,
      t,
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
        <Backdrop activeOpacity={1} onPress={closeSelectProject} active={selectProjectOpen} />

        <ActionSheet
          message={t('AddPostHeader:options:message')}
          isOpen={actionSheetIsOpen}
          onClose={this.toggleActionSheet}
          destructiveButtonIndex={0}
          options={[
            {
              name: t('AddPostHeader:options:discard'),
              onSelect: () => navigateBack(),
            },
            { name: t('AddPostHeader:options:cancel') },
          ]}
        />
      </Fragment>
    )
  }
}

export default compose(
  getCurrentUserProjects,
  withNamespaces('AddPostHeader')
)(AddPostHeader)
