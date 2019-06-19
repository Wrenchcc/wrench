import React, { useCallback } from 'react'
import { ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { compose } from 'react-apollo'
import { usePostStore } from 'store'
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

  const { files, caption, projectId } = usePostStore(store => ({
    update: store.actions.update,
    files: store.files,
    caption: store.caption,
    projectId: store.projectId,
  }))

  const handleAddPost = async () => {
    navigate(SCREENS.FEED)

    // showNotification({
    //   image: files[0].uri,
    //   title,
    // })

    try {
      const uploadedFiles = await uploadFiles(files)

      await addPostMutation({
        caption,
        files: uploadedFiles,
        projectId,
      })

      track(events.POST_CREATED)
    } catch (err) {
      // showNotification({
      //   dismissAfter: 6000,
      //   content: t('AddPost:error'),
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
        addPostAction={handleAddPost}
        toggleSelectProject={PostContainer.toggleSelectProject}
      />*/}
      <KeyboardAvoidingView paddingHorizontal={0}>
        <ScrollView style={{ paddingHorizontal: 20 }}>
          <SelectedFiles selectedFiles={files} />

          <Input
            scrollEnabled={false}
            multiline
            autoFocus
            waitForRender
            color="dark"
            onChangeText={value => update('caption', value)}
            placeholder={t('AddPost:placeholder')}
            value={caption}
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
