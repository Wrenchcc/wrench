import React, { useState, useCallback } from 'react'
import { Alert } from 'react-native'
import {
  useEditProjectMutation,
  useDeleteProjectMutation,
  CurrentUserDocument,
} from '@wrench/common'
import { useTranslation } from 'react-i18next'
import NativeShare from 'react-native-share'
import { SCREENS, useNavigation, ScrollView } from 'navigation'
import Header from 'navigation/Page/Header'
import { ActivityIndicator, Text, Title, Icon, Input, SelectionItem } from 'ui'
import { close } from 'images'
import { Inner, Spacing } from './styles'

function EditProject({ project, onDeleteCallback }) {
  const { t } = useTranslation(['edit-project', 'share'])
  const { navigate, dismissModal } = useNavigation()

  const [editProject] = useEditProjectMutation()
  const [deleteProject] = useDeleteProjectMutation({
    onCompleted: () => {
      // `navigateBack` has to be called with componentId from the stack that was open
      onDeleteCallback && onDeleteCallback()
    },
  })

  const [isSaving, setIsSaving] = useState(false)
  const [title, setTitle] = useState(project.title)

  const onChangeText = useCallback((text) => setTitle(text), [])
  const handleClose = useCallback(() => dismissModal(), [])

  const handleShare = useCallback(() => {
    NativeShare.open({
      url: `https://wrench.cc/project/${project.slug}`,
      title: project.title,
    }).catch(() => {})
  }, [project])

  const handleEditProject = useCallback(async () => {
    setIsSaving(true)

    await editProject({
      variables: {
        id: project.id,
        input: {
          title,
        },
      },
    })

    setTimeout(() => {
      setIsSaving(false)
      dismissModal()
    }, 500)
  }, [title])

  const navigateToModel = useCallback(
    () =>
      navigate(SCREENS.EDIT_MODEL, {
        passProps: {
          id: project.id,
          model: project.model,
        },
      }),

    [project]
  )

  const onDelete = useCallback(async () => {
    dismissModal()

    await deleteProject({
      variables: {
        id: project.id,
      },
      update: (cache) => {
        try {
          const data = cache.readQuery({ query: CurrentUserDocument })

          cache.writeQuery({
            query: CurrentUserDocument,
            data: {
              ...data,
              user: {
                ...data.user,
                projects: {
                  ...data.user.projects,
                  edges: data.user.projects.edges.filter(({ node }) => node.id !== project.id),
                },
              },
            },
          })
        } catch (err) {
          console.log(err)
        }
      },
    })
  }, [dismissModal])

  const renderHeaderLeft = () => {
    if (isSaving) {
      return <Icon source={close} color="dark" opacity={0.4} />
    }

    return <Icon onPress={handleClose} source={close} color="dark" />
  }

  const renderHeaderRight = () =>
    isSaving ? (
      <ActivityIndicator />
    ) : (
      <Text medium onPress={handleEditProject}>
        {t('done')}
      </Text>
    )

  const renderHeaderCenter = () => (
    <Text medium numberOfLines={1}>{`${t('headerTitle')} ${project.title}`}</Text>
  )

  const toggleActionSheet = () => {
    if (project.permissions.isOwner) {
      Alert.alert(
        t('deleteAlert'),
        t('description'),
        [
          {
            text: t('cancel'),
            style: 'cancel',
          },
          {
            onPress: onDelete,
            style: 'destructive',
            text: t('delete'),
          },
        ],
        {
          cancelable: false,
        }
      )
    }
  }

  return (
    <>
      <Header
        headerLeft={renderHeaderLeft()}
        headerRight={renderHeaderRight()}
        headerCenter={renderHeaderCenter()}
      />
      <ScrollView>
        <Inner>
          <Title>{t('information')}</Title>
          <Input
            placeholder={t('title')}
            value={title}
            onChangeText={onChangeText}
            color="dark"
            onSubmitEditing={handleEditProject}
            returnKeyType="done"
          />

          <Spacing large />

          <Text onPress={navigateToModel}>{t('model')}</Text>
        </Inner>

        <Inner>
          <Title>{t('share:share')}</Title>
          <Spacing large />

          <Text onPress={handleShare}>{t('share:share')}</Text>
        </Inner>

        <Inner>
          <Title>{t('projectSettings')}</Title>
          <SelectionItem last important title={t('deleteTitle')} onPress={toggleActionSheet} />
        </Inner>
      </ScrollView>
    </>
  )
}

export default EditProject
