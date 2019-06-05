import React, { Fragment, useCallback } from 'react'
import { ScrollView } from 'react-native'
import { pathOr } from 'ramda'
import { Subscribe } from 'unstated'
import { useTranslation } from 'react-i18next'
import { AddContainer, ToastNotificationContainer } from 'store'
import { compose } from 'react-apollo'
import { useNavigation, SCREENS } from 'navigation'
import { addPost } from 'graphql/mutations/post/addPost'
import { getCurrentUserProjects } from 'graphql/queries/user/getCurrentUserProjects'
import { track, events } from 'utils/analytics'
import { logError } from 'utils/sentry'
import { uploadFiles } from 'utils/storage/s3'
import AddPostHeader from 'features/project/components/AddPostHeader'
import SelectedFiles from 'features/project/components/SelectedFiles'
import { Input, KeyboardAvoidingView } from 'ui'

function getProjectByIdOrFirst(id, projects) {
  return pathOr(projects[0].node, ['node'], projects.find(({ node }) => node.id === id))
}

function AddPost({ projects, addPost }) {
  const { t } = useTranslation()
  const { navigate } = useNavigation()

  const handleNavigation = useCallback(() => {
    navigate(SCREENS.FEED)
  }, [])

  const handleAddPost = async (PostContainer, showNotification) => {
    const { showPostProgress, state, resetState, hidePostProgress } = PostContainer

    const { title, id } = getProjectByIdOrFirst(state.selectedProjectId, projects)

    handleNavigation()

    showPostProgress({
      image: state.selectedFiles[0].uri,
      title,
    })

    try {
      const uploadedFiles = await uploadFiles(state.selectedFiles)

      await addPost({
        caption: state.caption,
        projectId: id,
        files: uploadedFiles,
      }).then(resetState)

      track(events.POST_CREATED)
    } catch (err) {
      hidePostProgress()

      showNotification({
        type: 'error',
        message: t('AddPost:error'),
        dismissAfter: 6000,
      })

      logError(err)
      track(events.POST_CREATED_FAILED)
    }
  }

  return (
    <Subscribe to={[AddContainer, ToastNotificationContainer]}>
      {(PostContainer, { showNotification }) => (
        <Fragment>
          <AddPostHeader
            changeProject={PostContainer.changeProject}
            closeSelectProject={PostContainer.closeSelectProject}
            selectedProjectId={PostContainer.state.selectedProjectId}
            selectProjectOpen={PostContainer.state.selectProjectOpen}
            addPostAction={() => handleAddPost(PostContainer, showNotification)}
            toggleSelectProject={PostContainer.toggleSelectProject}
          />
          <KeyboardAvoidingView paddingHorizontal={0}>
            <ScrollView style={{ paddingLeft: 20, paddingRight: 20 }}>
              <SelectedFiles selectedFiles={PostContainer.state.selectedFiles} />

              <Input
                scrollEnabled={false}
                multiline
                autoFocus
                waitForRender
                color="dark"
                onChangeText={PostContainer.updateCaption}
                placeholder={t('AddPost:placeholder')}
                value={PostContainer.state.caption}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        </Fragment>
      )}
    </Subscribe>
  )
}

export default compose(
  addPost,
  getCurrentUserProjects
)(AddPost)
