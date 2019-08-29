import React, { useCallback } from 'react'
import { ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation, dismissModal, SCREENS } from 'navigation'
import { usePostStore, useToastStore, POST } from 'store'
import { addPost } from 'graphql/mutations/post/addPost'
import { track, events } from 'utils/analytics'
import { logError } from 'utils/sentry'
import { TOAST_TYPES } from 'utils/enums'
import uploadFiles from 'utils/storage/s3'
import { Header, Input, KeyboardAvoidingView, Icon, Text } from 'ui'
import { arrowLeft } from 'images'
import SelectedFiles from '../../components/SelectedFiles'
import SelectProject from '../../components/SelectProject'

function AddPost({ addPost: addPostMutation }) {
  const { t } = useTranslation()
  const { navigateBack } = useNavigation()

  const { files, caption, update, reset, projectId, setIsPosting } = usePostStore(store => ({
    caption: store.caption,
    files: store.files,
    projectId: store.projectId,
    reset: store.actions.reset,
    setIsPosting: store.actions.setIsPosting,
    update: store.actions.update,
  }))

  const toastActions = useToastStore(store => store.actions)

  const handleNavigationBack = useCallback(() => {
    navigateBack()
  }, [navigateBack])

  const onChangeText = useCallback(value => update(POST.CAPTION, value), [update])

  const handleAddPost = async () => {
    dismissModal(true)
    setIsPosting(true)

    try {
      const uploaded = await uploadFiles(files)

      await addPostMutation({
        caption,
        files: uploaded,
        projectId,
      })

      reset()
      track(events.POST_CREATED)
    } catch (err) {
      setIsPosting(false)

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

      <SelectProject dark />

      <KeyboardAvoidingView paddingHorizontal={0} keyboardVerticalOffset={0}>
        <ScrollView style={{ paddingHorizontal: 20 }} keyboardDismissMode="on-drag">
          <SelectedFiles selectedFiles={files} />

          <Input
            scrollEnabled={false}
            multiline
            autoFocus
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

export default addPost(AddPost)
