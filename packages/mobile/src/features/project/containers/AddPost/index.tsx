import React, { useCallback } from 'react'
import { ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useReactiveVar } from '@apollo/client'
import { useAddPostMutation, PostFragmentDoc } from '@wrench/common'
import { useNavigation } from 'navigation'
import { store } from 'gql'
import { logError } from 'utils/sentry'
import { TOAST_TYPES } from 'utils/enums'
import uploadToS3Async from 'utils/storage/uploadToS3Async'
import Collections from 'features/project/components/Collections'
import { Header, Input, KeyboardAvoidingView, Icon, Text, Title } from 'ui'
import { arrowLeft } from 'images'
import SelectedFiles from '../../components/SelectedFiles'
import SelectProject from '../../components/SelectProject'

function AddPost() {
  const { t } = useTranslation()
  const { navigateBack, dismissModal } = useNavigation()
  const [addPost] = useAddPostMutation()

  const caption = useReactiveVar(store.post.captionVar)
  const collectionId = useReactiveVar(store.collection.collectionVar)
  const files = useReactiveVar(store.files.croppedFilesVar)
  const projectId = useReactiveVar(store.project.selectedIdVar)

  const handleNavigationBack = useCallback(() => {
    navigateBack()
  }, [navigateBack])

  const onChangeText = useCallback((value) => store.post.captionVar(value), [])

  const onChangeCollection = useCallback((id) => store.collection.toggleCollection(id), [])

  const handleAddPost = async () => {
    dismissModal(true)
    store.post.isPostingVar(true)

    try {
      const uploaded = await uploadToS3Async(files)

      await addPost({
        variables: {
          input: {
            caption,
            files: uploaded,
            projectId,
            collectionId,
          },
        },
        update: (cache, { data: { addPost } }) => {
          const newPostRef = cache.writeFragment({
            fragmentName: 'Post',
            data: addPost,
            fragment: PostFragmentDoc,
          })

          const node = {
            cursor: -1,
            node: newPostRef,
          }

          // User
          cache.modify({
            id: cache.identify({
              __typename: 'User',
              id: addPost.user.id,
            }),
            fields: {
              postsConnection(existingPostsRefs = {}) {
                return {
                  ...existingPostsRefs,
                  edges: [node, ...existingPostsRefs.edges],
                }
              },
            },
          })

          cache.modify({
            fields: {
              // Feed
              feed(existingFeedRefs = {}) {
                return {
                  ...existingFeedRefs,
                  postsConnection: {
                    ...existingFeedRefs.postsConnection,
                    edges: [node, ...existingFeedRefs.postsConnection.edges],
                  },
                }
              },
              // Exolore
              posts(existingPostsRefs = {}) {
                return {
                  ...existingPostsRefs,
                  edges: [node, ...existingPostsRefs.edges],
                }
              },
            },
          })
        },
      })

      // Reset after post
      store.post.isPostingVar(false)
      store.files.reset()
      store.post.captionVar('')
      store.project.selectedIdVar('')
      store.collection.collectionVar('')
    } catch (err) {
      store.post.isPostingVar(false)

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

          <Title style={{ marginBottom: 20 }}>{t('AddPost:collection')}</Title>
          <Collections
            disableModal
            isOwner
            projectId={projectId}
            onPress={onChangeCollection}
            selectedId={collectionId}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

export default AddPost
