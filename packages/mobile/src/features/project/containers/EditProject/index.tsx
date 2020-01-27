import React, { useState, useCallback } from 'react'
import { ScrollView, ActivityIndicator, Alert } from 'react-native'
import { useTranslation } from 'react-i18next'
import { SCREENS, useNavigation } from 'navigation'
import { Text, Title, Header, Icon, Input, SelectionItem } from 'ui'
import { close } from 'images'
import { Inner, Spacing } from './styles'

function EditProject({ project }) {
  const deleteProjectMutations = () => {}
  const editProjectMutation = () => {}

  const { t } = useTranslation()
  const { navigate, dismissModal } = useNavigation()

  const [isSaving, setIsSaving] = useState(false)
  const [title, setTitle] = useState(project.title)

  const onChangeText = useCallback(text => setTitle(text), [])
  const handleClose = useCallback(() => dismissModal(), [])

  const handleEditProject = useCallback(async () => {
    setIsSaving(true)

    await editProjectMutation(project.id, {
      title,
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
    await deleteProjectMutations(project.id)
    dismissModal()
  }, [dismissModal])

  const renderHeaderLeft = () => {
    if (isSaving) {
      return <Icon source={close} color="dark" opacity={0.4} />
    }

    return <Icon onPress={handleClose} source={close} color="dark" />
  }

  const renderHeaderRight = () =>
    isSaving ? (
      <ActivityIndicator size="small" color="black" />
    ) : (
      <Text medium onPress={handleEditProject}>
        {t('EditProject:done')}
      </Text>
    )

  const renderHeaderCenter = () => (
    <Text medium numberOfLines={1}>{`${t('EditProject:headerTitle')} ${project.title}`}</Text>
  )

  const toggleActionSheet = () => {
    if (project.permissions.isOwner) {
      Alert.alert(
        t('EditProject:deleteAlert'),
        t('EditProject:description'),
        [
          {
            text: t('EditProject:cancel'),
            style: 'cancel',
          },
          {
            onPress: onDelete,
            style: 'destructive',
            text: t('EditProject:delete'),
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
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 50 }}>
        <Inner>
          <Title>{t('EditProject:information')}</Title>
          <Input
            placeholder={t('EditProject:title')}
            value={title}
            onChangeText={onChangeText}
            color="dark"
            onSubmitEditing={handleEditProject}
            returnKeyType="done"
          />

          <Spacing large />

          <Text onPress={navigateToModel}>{t('EditProject:model')}</Text>
        </Inner>

        <Inner>
          <Title>{t('EditProject:projectSettings')}</Title>
          <SelectionItem last title={t('EditProject:deleteTitle')} onPress={toggleActionSheet} />
        </Inner>
      </ScrollView>
    </>
  )
}

export default EditProject
