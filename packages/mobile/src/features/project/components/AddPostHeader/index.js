import React, { useState } from 'react'
import { pathOr } from 'ramda'
import { useTranslation } from 'react-i18next'
import { getCurrentUserProjects } from 'graphql/queries/user/getCurrentUserProjects'
import { dismissModal, navigateBack, useNavigation, SCREENS } from 'navigation'
import { Header, Dropdown, Icon, Text, ActionSheet } from 'ui'
import SelectProject from 'features/project/components/SelectProject'
import { close, arrowLeft } from 'images'
import { Backdrop, Top } from './styles'

function getProjectByIdOrFirst(id, projects) {
  return pathOr(projects[0].node, ['node'], projects.find(({ node }) => node.id === id))
}

function AddPostHeader({
  changeProject,
  closeSelectProject,
  projects,
  selectedProjectId,
  selectProjectOpen,
  addPostAction,
  toggleSelectProject,
  hasSelectedFiles,
  resetState,
}) {
  const { t } = useTranslation()
  const [actionSheetIsOpen, setActionSheetIsOpen] = useState(false)
  const toggleActionSheet = () => setActionSheetIsOpen(!actionSheetIsOpen)
  const { navigate } = useNavigation()

  const handleNavigation = () => navigate(SCREENS.ADD_POST)

  const handleClose = () => {
    if (hasSelectedFiles) {
      toggleActionSheet()
    } else {
      dismissModal()
    }
  }

  const resetStateAndNavigate = () => {
    resetState()
    dismissModal()
  }

  const renderHeaderRight = () => {
    if (hasSelectedFiles) {
      return (
        <Text color="white" medium onPress={handleNavigation} hapticFeedback="impactLight">
          {t('AddPostHeader:next')}
        </Text>
      )
    }

    if (addPostAction) {
      return (
        <Text color="dark" medium onPress={addPostAction} hapticFeedback="impactLight">
          {t('AddPostHeader:share')}
        </Text>
      )
    }

    return null
  }

  const renderHeaderLeft = () => {
    if (addPostAction) {
      return <Icon onPress={() => navigateBack()} source={arrowLeft} />
    }

    return <Icon onPress={handleClose} source={close} />
  }

  const { id, title } = getProjectByIdOrFirst(selectedProjectId, projects)
  return (
    <>
      <Header headerLeft={renderHeaderLeft()} headerRight={renderHeaderRight()} />

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
        onClose={closeSelectProject}
      />

      <Backdrop activeOpacity={1} onPress={closeSelectProject} active={selectProjectOpen} />

      <ActionSheet
        title={t('AddPostHeader:options:title')}
        isOpen={actionSheetIsOpen}
        onClose={toggleActionSheet}
        destructiveButtonIndex={0}
        options={[
          {
            name: t('AddPostHeader:options:discard'),
            onSelect: resetStateAndNavigate,
          },
          { name: t('AddPostHeader:options:cancel') },
        ]}
      />
    </>
  )
}

export default getCurrentUserProjects(AddPostHeader)
