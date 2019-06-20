import React, { useCallback } from 'react'
import { ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { compose } from 'react-apollo'
import { useNavigation, SCREENS } from 'navigation'
import { usePostStore, useToastStore } from 'store'
import { addPost } from 'graphql/mutations/post/addPost'
import { getCurrentUserProjects } from 'graphql/queries/user/getCurrentUserProjects'
import { track, events } from 'utils/analytics'
import { logError } from 'utils/sentry'
import { TOAST_TYPES } from 'utils/enums'
import { uploadFiles } from 'utils/storage/s3'
import SelectedFiles from 'features/project/components/SelectedFiles'
import { Header, Input, KeyboardAvoidingView } from 'ui'

function AddPost({ projects, addPost: addPostMutation }) {
  const { t } = useTranslation()
  const { navigate } = useNavigation()

  const { files, caption, projectId } = usePostStore(store => ({
    caption: store.caption,
    files: store.files,
    projectId: store.projectId,
    setIsPosting: store.actions.setIsPosting,
    update: store.actions.update,
  }))

  const toastActions = useToastStore(store => store.actions)

  const handleAddPost = async () => {
    navigate(SCREENS.FEED)

    setIsPosting(true)

    try {
      const uploadedFiles = await uploadFiles(files)

      await addPostMutation({
        caption,
        files: uploadedFiles,
        projectId,
      })

      setIsPosting(false)

      track(events.POST_CREATED)
    } catch (err) {
      toastActions.show({
        content: t('AddPost:error'),
        dismissAfter: 6000,
        type: TOAST_TYPES.ERROR,
      })

      logError(err)
      track(events.POST_CREATED_FAILED)
    }
  }

  return (
    <>
      {/*<Header
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
