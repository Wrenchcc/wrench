import React, { useCallback, useRef, useState } from 'react'
import { Alert, View, Animated } from 'react-native'
import { useTranslation } from 'react-i18next'
import {
  useDeletePostMutation,
  useLikePostMutation,
  useEditPostMutation,
  useTranslatePostMutation,
} from '@wrench/common'
import { State, TapGestureHandler } from 'react-native-gesture-handler'
import NativeShare from 'react-native-share'
import Clipboard from '@react-native-community/clipboard'
import * as Haptics from 'expo-haptics'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { useNavigation, SCREENS } from 'navigation'
import openLink from 'utils/openLink'
import Collections from 'features/project/components/Collections'
import { useDynamicColor } from 'utils/hooks'
import { keyboardHeight } from 'utils/platform'
import { Avatar, Carousel, Comments, Title, Text, Icon, TimeAgo } from 'ui'
import { TOAST_TYPES } from 'utils/enums'
import { showToast } from 'navigation/Banner'
import LikePost from 'components/LikePost'
import Bookmark from 'components/Bookmark'
import { share, sparkMega, arrowRightSmall } from 'images'
import { Base, Top, Left, Headline, Content, Spacer, Row, Collection, Bottom } from './styles'

function Post({ post, withoutTitle, withoutComments, withoutCollections, paddingBottom }) {
  const { t } = useTranslation('post')
  const { navigate, showEditPost, showHalfpanel, dismissHalfpanel } = useNavigation()
  const [original, setOriginal] = useState(true)
  const dynamicColor = useDynamicColor('inverse')
  const dynamicBackgroundColor = useDynamicColor('default')
  const [deletePost] = useDeletePostMutation()
  const [toggleLike] = useLikePostMutation()
  const [editPost] = useEditPostMutation()

  const [translatePost, { loading: translationLoading }] = useTranslatePostMutation()

  const handleTranslation = useCallback(() => {
    setOriginal(!original)

    translatePost({
      variables: {
        id: post.id,
        original: !original,
      },
    })
  }, [post, original])

  const handleEdit = useCallback(() => showEditPost({ post }), [post])

  const addToCollection = useCallback(async (id) => {
    await editPost({
      variables: {
        id: post.id,
        input: {
          collectionId: id,
        },
      },
    })

    dismissHalfpanel()
  }, [])

  const removeFromCollection = useCallback(async () => {
    await editPost({
      variables: {
        id: post.id,
        input: {
          caption: post.caption,
        },
      },
      update(cache) {
        cache.modify({
          fields: {
            collections(existingCollectionsRefs = {}, { readField }) {
              return {
                ...existingCollectionsRefs,
                edges: existingCollectionsRefs.edges.filter(
                  ({ node }) => post.id !== readField('id', node)
                ),
              }
            },
          },
        })
      },
    })
  }, [])

  const navigateToCollection = useCallback(
    () =>
      navigate(SCREENS.COLLECTIONS, {
        id: post.collection.id,
        isOwner: post.permissions.isOwner,
        name: post?.collection.name,
        projectId: post.project.id,
        projectSlug: post.project.slug,
        slug: post.collection.slug,
      }),
    [post]
  )

  const animatedValue = useRef(new Animated.Value(0))

  const handleToggleLike = useCallback(
    (evt) => {
      if (evt.nativeEvent.state === State.ACTIVE) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

        if (!post.likes.isLiked) {
          Animated.sequence([
            Animated.spring(animatedValue.current, {
              toValue: 1,
              useNativeDriver: true,
              tension: 250,
            }),
            Animated.spring(animatedValue.current, { toValue: 0, useNativeDriver: true }),
          ]).start()

          toggleLike({
            variables: {
              id: post.id,
            },
            optimisticResponse: {
              __typename: 'Mutation',
              likePost: {
                __typename: 'Post',
                ...post,
                likes: {
                  __typename: 'Likes',
                  isLiked: true,
                  totalCount: post.likes.totalCount + 1,
                },
              },
            },
          })
        }
      }
    },
    [toggleLike, post]
  )

  const handleDeletePost = useCallback(
    (id) => {
      deletePost({
        variables: {
          id,
        },
        update(cache) {
          // Project
          cache.modify({
            id: cache.identify({
              __typename: 'Project',
              id: post.project.id,
            }),
            fields: {
              postsConnection(existingPostsRefs = {}, { readField }) {
                return {
                  ...existingPostsRefs,
                  edges: existingPostsRefs.edges.filter(({ node }) => id !== readField('id', node)),
                }
              },
            },
          })

          // User
          cache.modify({
            id: cache.identify({
              __typename: 'User',
              id: post.user.id,
            }),
            fields: {
              postsConnection(existingPostsRefs = {}, { readField }) {
                return {
                  ...existingPostsRefs,
                  edges: existingPostsRefs.edges.filter(({ node }) => id !== readField('id', node)),
                }
              },
            },
          })

          cache.modify({
            fields: {
              // Feed
              feed(existingFeedRefs = {}, { readField }) {
                return {
                  ...existingFeedRefs,
                  postsConnection: {
                    ...existingFeedRefs.postsConnection,
                    edges: existingFeedRefs.postsConnection.edges.filter(
                      ({ node }) => id !== readField('id', node)
                    ),
                  },
                }
              },
              // Exolore
              posts(existingPostsRefs = {}, { readField }) {
                return {
                  ...existingPostsRefs,
                  edges: existingPostsRefs.edges.filter(({ node }) => id !== readField('id', node)),
                }
              },
            },
          })
        },
      })
    },
    [deletePost]
  )
  const { showActionSheetWithOptions } = useActionSheet()

  const navigateToProject = useCallback(() => {
    if (!withoutTitle) {
      navigate(SCREENS.PROJECT, {
        id: post.project.id,
        post,
        postId: post.id,
        project: post.project,
      })
    }
  }, [post, withoutTitle])

  const navigateToUser = useCallback(() => {
    navigate(SCREENS.USER, {
      user: post.user,
    })
  }, [post])

  const onDelete = useCallback(() => {
    Alert.alert(
      t('options.alertTitle'),
      null,
      [
        {
          onPress: () => handleDeletePost(post.id),
          style: 'destructive',
          text: t('options.delete'),
        },
        {
          style: 'cancel',
          text: t('options.cancel'),
        },
      ],
      { cancelable: false }
    )
  }, [post])

  const handleActionSheet = useCallback(() => {
    if (post.permissions.isOwner) {
      const options = [
        t('options.edit'),
        t('options.copy'),
        t('options.share'),
        post.collection ? t('options.removeCollection') : t('options.collection'),
        t('options.delete'),
        t('options.cancel'),
      ]

      showActionSheetWithOptions(
        {
          options,
          destructiveButtonIndex: 4,
          cancelButtonIndex: 5,
          tintColor: dynamicColor,
          containerStyle: {
            backgroundColor: dynamicBackgroundColor,
          },
        },
        (index) => {
          if (index === 0) {
            handleEdit()
          }

          // Copy link
          if (index === 1) {
            Clipboard.setString(`https://wrench.cc/p/${post.id}`)

            showToast({
              content: t('copySuccess'),
              type: TOAST_TYPES.SUCCESS,
            })
          }

          // Share
          if (index === 2) {
            NativeShare.open({
              url: `https://wrench.cc/p/${post.id}`,
            }).catch(() => {})
          }

          if (index === 3) {
            if (post.collection) {
              removeFromCollection()
            } else {
              showHalfpanel({
                height: keyboardHeight || 400,
                renderContent: () => (
                  <>
                    <Spacer />
                    <Title>{t('selectCollection')}</Title>
                    <Spacer />

                    <Collections
                      projectId={post.project.id}
                      isOwner
                      onSave={addToCollection}
                      loading
                    />
                  </>
                ),
              })
            }
          }

          if (index === 4) {
            onDelete()
          }
        }
      )
    } else {
      const options = [
        t('options.report'),
        t('options.copy'),
        t('options.share'),
        t('options.cancel'),
      ]
      showActionSheetWithOptions(
        {
          options,
          destructiveButtonIndex: 0,
          cancelButtonIndex: 3,
          tintColor: dynamicColor,
          containerStyle: {
            backgroundColor: dynamicBackgroundColor,
          },
        },
        (index) => {
          if (index === 0) {
            openLink(`mailto:report@wrench.cc?subject=Report%20post:%20${post.id}`)
          }

          if (index === 1) {
            Clipboard.setString(`https://wrench.cc/p/${post.id}`)

            showToast({
              content: t('copySuccess'),
              type: TOAST_TYPES.SUCCESS,
            })
          }

          // Share
          if (index === 2) {
            NativeShare.open({
              url: `https://wrench.cc/p/${post.id}`,
            }).catch(() => {})
          }
        }
      )
    }
  }, [handleEdit, onDelete, showActionSheetWithOptions, dynamicColor, dynamicBackgroundColor])

  return (
    <Base paddingBottom={paddingBottom}>
      <Top>
        <Left>
          <Avatar
            uri={post.user.avatarUrl}
            onPress={navigateToUser}
            isOnline={post.user.isOnline}
            fallback={post.user.isSilhouette}
            fullName={post.user.fullName}
          />
          <Text
            medium
            onPress={navigateToUser}
            style={{ marginLeft: 10 }}
            fontSize={14}
            numberOfLines={1}
          >
            {post.user.fullName}
          </Text>
        </Left>
        <Icon source={share} onPress={handleActionSheet} hitSlop={20} />
      </Top>
      <Content>
        {!withoutTitle && post.project.title && (
          <Headline>
            <Title fontSize={19} numberOfLines={1} onPress={navigateToProject}>
              {post.project.title}
            </Title>
          </Headline>
        )}

        <Text
          onPress={navigateToProject}
          disabled={withoutTitle}
          color={withoutTitle ? 'dark' : 'grey'}
          fontSize={15}
          lineHeight={24}
          maxText={120}
          parseEnabled
        >
          {post.caption}
        </Text>

        <Spacer />

        {post.files && (
          <TapGestureHandler numberOfTaps={2} onHandlerStateChange={handleToggleLike}>
            <View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Carousel files={post.files} />

                <Animated.Image
                  pointerEvents="none"
                  source={sparkMega}
                  style={{
                    position: 'absolute',
                    opacity: animatedValue.current,
                    transform: [
                      {
                        scale: animatedValue.current.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.7, 1.5],
                        }),
                      },
                    ],
                  }}
                />
              </View>
            </View>
          </TapGestureHandler>
        )}
      </Content>

      {!withoutCollections && post.collection && (
        <Collection onPress={navigateToCollection}>
          <Text fontSize={15} medium>
            {t('showCollection')}
          </Text>
          <Icon source={arrowRightSmall} />
        </Collection>
      )}

      <Row>
        <LikePost post={post} />
        <Bookmark post={post} />
      </Row>
      {!withoutComments && <Comments data={post} />}

      <Bottom>
        <TimeAgo date={post.createdAt} long />
        {post.translatable && (
          <>
            <Text color="neutral" medium fontSize={12} style={{ marginLeft: 7, marginRight: 7 }}>
              •
            </Text>
            {translationLoading ? (
              <Text color="inverse" medium fontSize={12}>
                {t('loading')}
              </Text>
            ) : (
              <Text color="inverse" medium fontSize={12} onPress={handleTranslation}>
                {original ? t('translation') : t('original')}
              </Text>
            )}
          </>
        )}
      </Bottom>
    </Base>
  )
}

export default Post
