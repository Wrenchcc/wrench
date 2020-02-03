import React, { useCallback } from 'react'
import { ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useAddPostMutation } from '@wrench/common'
import { useNavigation, dismissModal } from 'navigation'
import { usePostStore, useToastStore, POST } from 'store'
import { track, events } from 'utils/analytics'
import { logError } from 'utils/sentry'
import { TOAST_TYPES } from 'utils/enums'
import uploadToS3Async from 'utils/storage/uploadToS3Async'
import { Header, Input, KeyboardAvoidingView, Icon, Text } from 'ui'
import { arrowLeft } from 'images'
import SelectedFiles from '../../components/SelectedFiles'
import SelectProject from '../../components/SelectProject'

function AddPost() {
  const { t } = useTranslation()
  const { navigateBack } = useNavigation()
  const [addPost] = useAddPostMutation()

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

    // updateQueries: {
    //   getFeed: (prev, { mutationResult }) => {
    //     const edge = {
    //       cursor: -1,
    //       node: {
    //         ...mutationResult.data.addPost,
    //         project: {
    //           ...mutationResult.data.addPost.project,
    //           user: mutationResult.data.addPost.user,
    //         },
    //       },
    //       __typename: 'PostEdge',
    //     }

    //     return {
    //       ...prev,
    //       feed: {
    //         ...prev.feed,
    //         posts: {
    //           ...prev.feed.posts,
    //           edges: prepend(edge, prev.feed.posts.edges),
    //         },
    //       },
    //     }
    //   },
    //   getRecentPosts: (prev, { mutationResult }) => {
    //     const edge = {
    //       cursor: -1,
    //       node: {
    //         ...mutationResult.data.addPost,
    //         project: {
    //           ...mutationResult.data.addPost.project,
    //           user: mutationResult.data.addPost.user,
    //         },
    //       },
    //       __typename: 'PostEdge',
    //     }

    //     return {
    //       ...prev,
    //       posts: {
    //         ...prev.posts,
    //         edges: prepend(edge, prev.posts.edges),
    //       },
    //     }
    //   },
    //   getCurrentUserProfile: (prev, { mutationResult }) => {
    //     const edge = {
    //       cursor: -1,
    //       node: {
    //         ...mutationResult.data.addPost,
    //         project: {
    //           ...mutationResult.data.addPost.project,
    //           user: mutationResult.data.addPost.user,
    //         },
    //       },
    //       __typename: 'PostEdge',
    //     }

    //     return {
    //       ...prev,
    //       user: {
    //         ...prev.user,
    //         posts: {
    //           ...prev.user.posts,
    //           edges: prepend(edge, prev.user.posts.edges),
    //         },
    //       },
    //     }
    //   },

    try {
      const uploaded = await uploadToS3Async(files)

      await addPost({
        variables: {
          input: {
            caption,
            files: uploaded,
            projectId,
          },
        },
        update: cache => {},
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
            keyboardType="twitter"
            multiline
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

export default AddPost
