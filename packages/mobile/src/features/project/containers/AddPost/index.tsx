import React, { useCallback } from 'react'
import { ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
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

function AddPost({ projects, addPost: addPostMutation }) {
  const { t } = useTranslation()
  const { navigate } = useNavigation()

  const handleNavigation = useCallback(() => {
    navigate(SCREENS.FEED)
  }, [])

  const handleAddPost = async PostContainer => {
    const { state, resetState, hidePostProgress } = PostContainer

    const { title, id } = getProjectByIdOrFirst(state.selectedProjectId, projects)

    handleNavigation()

    // showPostProgress({
    //   image: state.selectedFiles[0].uri,
    //   title,
    // })

    try {
      const uploadedFiles = await uploadFiles(state.selectedFiles)

      await addPostMutation({
        caption: state.caption,
        files: uploadedFiles,
        projectId: id,
      }).then(resetState)

      track(events.POST_CREATED)
    } catch (err) {
      hidePostProgress()

      // showNotification({
      //   dismissAfter: 6000,
      //   message: t('AddPost:error'),
      //   type: 'error',
      // })

      logError(err)
      track(events.POST_CREATED_FAILED)
    }
  }

  return (
    <>
      {/*<AddPostHeader
        changeProject={PostContainer.changeProject}
        closeSelectProject={PostContainer.closeSelectProject}
        selectedProjectId={PostContainer.state.selectedProjectId}
        selectProjectOpen={PostContainer.state.selectProjectOpen}
        addPostAction={() => handleAddPost(PostContainer)}
        toggleSelectProject={PostContainer.toggleSelectProject}
      />*/}
      <KeyboardAvoidingView paddingHorizontal={0}>
        <ScrollView style={{ paddingHorizontal: 20 }}>
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
    </>
  )
}

export default compose(
  addPost,
  getCurrentUserProjects
)(AddPost)
