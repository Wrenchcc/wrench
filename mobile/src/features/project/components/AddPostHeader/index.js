import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'
import { compose } from 'react-apollo'
import { getCurrentUserProjects } from 'graphql/queries/user/getCurrentUserProjects'
import { navigateBack, navigateToAddPost } from 'navigation'
import { Header, Dropdown, Icon, Text, ActionSheet } from 'ui'
import SelectProject from 'features/project/components/SelectProject'
import { close, arrowLeft } from 'images'
import { pathOr } from 'ramda'
import { Backdrop, Top } from './styles'

function getProjectByIdOrFirst(id, projects) {
  return pathOr(projects[0].node, ['node'], projects.find(({ node }) => node.id === id))
}

class AddPostHeader extends PureComponent {
  state = {
    actionSheetIsOpen: false,
  }

  static propTypes = {
    addPostAction: PropTypes.func,
    changeProject: PropTypes.func.isRequired,
    closeSelectProject: PropTypes.func.isRequired,
    hasSelectedFiles: PropTypes.bool,
    projects: PropTypes.array.isRequired,
    resetState: PropTypes.func,
    selectedProjectId: PropTypes.string,
    selectProjectOpen: PropTypes.bool.isRequired,
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

  resetStateAndNavigate = () => {
    this.props.resetState()
    navigateBack()
  }

  renderHeaderRight() {
    const { t, hasSelectedFiles, addPostAction } = this.props

    if (hasSelectedFiles) {
      return (
        <Text color="white" medium onPress={() => navigateToAddPost()}>
          {t('AddPostHeader:next')}
        </Text>
      )
    }

    if (addPostAction) {
      return (
        <Text color="dark" medium onPress={addPostAction}>
          {t('AddPostHeader:share')}
        </Text>
      )
    }

    return null
  }

  renderHeaderLeft() {
    const { addPostAction } = this.props
    if (addPostAction) {
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
      selectedProjectId,
      selectProjectOpen,
      addPostAction,
      t,
      toggleSelectProject,
    } = this.props

    const { id, title } = getProjectByIdOrFirst(selectedProjectId, projects)

    return (
      <>
        <Header headerLeft={this.renderHeaderLeft()} headerRight={this.renderHeaderRight()} />

        <Top>
          <Dropdown
            title={title}
            onPress={toggleSelectProject}
            active={selectProjectOpen}
            darkMode={!!addPostAction}
          />
        </Top>

        <SelectProject
          expanded={selectProjectOpen}
          onPress={changeProject}
          projects={projects}
          selectedProjectId={id}
        />

        <Backdrop activeOpacity={1} onPress={closeSelectProject} active={selectProjectOpen} />

        <ActionSheet
          title={t('AddPostHeader:options:title')}
          isOpen={actionSheetIsOpen}
          onClose={this.toggleActionSheet}
          destructiveButtonIndex={0}
          options={[
            {
              name: t('AddPostHeader:options:discard'),
              onSelect: this.resetStateAndNavigate,
            },
            { name: t('AddPostHeader:options:cancel') },
          ]}
        />
      </>
    )
  }
}

export default compose(
  getCurrentUserProjects,
  withNamespaces('AddPostHeader')
)(AddPostHeader)
