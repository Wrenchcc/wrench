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
import { Header, Input, KeyboardAvoidingView, Icon, Text } from 'ui'
import { arrowLeft } from 'images'
import SelectedFiles from '../../components/SelectedFiles'
import SelectProject from '../../components/SelectProject'

function AddPost({ projects, addPost: addPostMutation }) {
  const { t } = useTranslation()
  const { dismissModal, navigateBack } = useNavigation()

  const { files, caption, update, projectId, setIsPosting } = usePostStore(store => ({
    caption: store.caption,
    files: store.files,
    projectId: store.projectId,
    setIsPosting: store.actions.setIsPosting,
    update: store.actions.update,
  }))

  const toastActions = useToastStore(store => store.actions)

  const handleNavigationBack = useCallback(() => {
    navigateBack()
  }, [])

  const onChangeText = useCallback(value => update('caption', value), [update])

  const handleAddPost = async () => {
    dismissModal(SCREENS.FEED)
    // setIsPosting(true)

    //  toastActions.show({
    //   content: t('AddPost:error'),
    //   dismissAfter: 6000,
    //   type: TOAST_TYPES.ERROR,
    // })

    try {
      // const uploadedFiles = await uploadFiles(files)
      //
      // await addPostMutation({
      //   caption,
      //   files: uploadedFiles,
      //   projectId,
      // })

      // setTimeout(() => {
      //   setIsPosting(false)
      // }, 5000)

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
      <Header
        headerLeft={<Icon source={arrowLeft} onPress={handleNavigationBack} />}
        headerRight={
          <Text medium onPress={handleAddPost}>
            {t('AddPost:add')}
          </Text>
        }
      />

      <SelectProject />

      <KeyboardAvoidingView paddingHorizontal={0}>
        <ScrollView style={{ paddingHorizontal: 20 }}>
          <SelectedFiles selectedFiles={files} />

          <Input
            scrollEnabled={false}
            multiline
            autoFocus
            waitForRender
            color="dark"
            onChangeText={onChangeText}
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
