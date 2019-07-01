import React, { useCallback, useMemo } from 'react'
import { ScrollView } from 'react-native'
// import Share from 'react-native-share'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import { usePostStore, useToastStore, POST } from 'store'
import { addPost } from 'graphql/mutations/post/addPost'
import { track, events } from 'utils/analytics'
import { logError } from 'utils/sentry'
import { TOAST_TYPES } from 'utils/enums'
import uploadFiles from 'utils/storage/s3'
import { Header, Input, KeyboardAvoidingView, Icon, Text, SelectionItem } from 'ui'
import { arrowLeft } from 'images'
import SelectedFiles from '../../components/SelectedFiles'
import SelectProject from '../../components/SelectProject'

function AddPost({ addPost: addPostMutation }) {
  const { t } = useTranslation()
  const { dismissModal, navigateBack } = useNavigation()

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

  // const shareOptions = useMemo(
  //   () => ({
  //     // title: 'Share via', // Project title
  //     message: caption,
  //     urls: files.map(({ uri }) => uri),
  //   }),
  //   [caption, files]
  // )

  const onChangeText = useCallback(value => update(POST.CAPTION, value), [update])

  const handleAddPost = async () => {
    dismissModal(SCREENS.FEED)
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

          {/*<Text medium style={{ marginTop: 40, marginBottom: 20 }}>
            {t('AddPost:social')}
          </Text>

          <SelectionItem
            type="switch"
            onPress={() =>
              Share.shareSingle({
                ...shareOptions,
                social: 'instagram',
              })
            }
            title="Instagram"
          />

          <SelectionItem
            type="switch"
            onPress={() =>
              Share.shareSingle({
                ...shareOptions,
                social: 'facebook',
              })
            }
            title="Facebook"
          />

          <SelectionItem
            type="switch"
            onPress={() =>
              Share.shareSingle({
                ...shareOptions,
                social: 'twitter',
              })
            }
            title="Twitter"
          />*/}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

export default addPost(AddPost)
