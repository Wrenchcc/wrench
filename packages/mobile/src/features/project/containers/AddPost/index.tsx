import React, { useCallback } from 'react'
import { ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import {
  useAddPostMutation,
  FeedDocument,
  PostsDocument,
  CurrentUserProfileDocument,
} from '@wrench/common'
import { useNavigation } from 'navigation'
import { usePostStore, POST } from 'store'
import { store } from 'gql'
import { logError } from 'utils/sentry'
import { TOAST_TYPES } from 'utils/enums'
import uploadToS3Async from 'utils/storage/uploadToS3Async'
// import Collections from 'features/project/components/Collections'
import { Header, Input, KeyboardAvoidingView, Icon, Text, Title } from 'ui'
import { arrowLeft } from 'images'
import SelectedFiles from '../../components/SelectedFiles'
import SelectProject from '../../components/SelectProject'

function AddPost() {
  const { t } = useTranslation()
  const { navigateBack, dismissModal } = useNavigation()
  const [addPost] = useAddPostMutation()

  const { files, caption, update, reset, projectId, setIsPosting } = usePostStore((store) => ({
    caption: store.caption,
    files: store.files,
    projectId: store.projectId,
    reset: store.actions.reset,
    setIsPosting: store.actions.setIsPosting,
    update: store.actions.update,
  }))

  const handleNavigationBack = useCallback(() => {
    navigateBack()
  }, [navigateBack])

  const onChangeText = useCallback((value) => update(POST.CAPTION, value), [update])

  const handleAddPost = async () => {
    dismissModal(true)
    setIsPosting(true)

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
        update: (cache, { data: { addPost } }) => {
          // Feed
          try {
            const data = cache.readQuery({ query: FeedDocument })

            cache.writeQuery({
              query: FeedDocument,
              data: {
                ...data,
                feed: {
                  ...data.feed,
                  posts: {
                    ...data.feed.posts,
                    edges: [
                      {
                        cursor: -1,
                        node: addPost,
                      },
                      ...data.feed.posts.edges,
                    ],
                  },
                },
              },
            })
          } catch (err) {
            logError(err)
          }

          // Explore
          try {
            const data = cache.readQuery({ query: PostsDocument })

            cache.writeQuery({
              query: PostsDocument,
              data: {
                ...data,
                posts: {
                  ...data.posts,
                  edges: [
                    {
                      cursor: -1,
                      node: addPost,
                    },
                    ...data.feed.posts.edges,
                  ],
                },
              },
            })
          } catch (err) {
            logError(err)
          }

          // Current user profile
          try {
            const data = cache.readQuery({ query: CurrentUserProfileDocument })

            cache.writeQuery({
              query: CurrentUserProfileDocument,
              data: {
                ...data,
                user: {
                  ...data.user,
                  posts: {
                    ...data.user.posts,
                    edges: [
                      {
                        cursor: -1,
                        node: addPost,
                      },
                      ...data.user.posts.edges,
                    ],
                  },
                },
              },
            })
          } catch (err) {
            logError(err)
          }
        },
      })

      reset()
    } catch (err) {
      setIsPosting(false)

      store.toast.show({
        content: t('AddPost:error'),
        dismissAfter: 6000,
        type: TOAST_TYPES.ERROR,
      })

      logError(err)
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

      <SelectProject black />

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
            style={{ marginBottom: 40 }}
          />

          {/* <Title style={{ marginBottom: 20 }}>Add to collection</Title> */}
          {/* <Collections isOwner projectId={projectId} /> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

export default AddPost
