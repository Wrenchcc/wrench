import React, { Fragment, useState, useCallback } from 'react'
import { ScrollView, ActivityIndicator, Alert } from 'react-native'
import { compose } from 'react-apollo'
import { useTranslation } from 'react-i18next'
import { editProject } from 'graphql/mutations/project/editProject'
import { deleteProject } from 'graphql/mutations/project/deleteProject'
import { dismissModal, useNavigation, SCREENS } from 'navigation'
import { Text, Title, Header, Icon, Input, SelectionItem } from 'ui'
import { closeDark } from 'images'
import { Inner, Spacing } from './styles'

function EditProject({ project, deleteProject, editProject }) {
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const [isSaving, setIsSaving] = useState(false)
  const [title, setTitle] = useState(project.title)
  const [commentsDisabled, setCommentsDisabled] = useState(project.commentsDisabled)

  const onChangeText = useCallback(title => setTitle(title), [])
  const onSelectionChange = useCallback(value => setCommentsDisabled(value), [])
  const handleClose = useCallback(() => dismissModal(), [])

  const handleEditProject = useCallback(() => {
    setIsSaving(true)

    editProject({ title, commentsDisabled }).then(
      setTimeout(() => {
        setIsSaving(false)
        dismissModal()
      }, 500)
    )
  }, [title, commentsDisabled])

  const onDelete = useCallback(() => {
    deleteProject().then(() => navigate(SCREENS.FEED))
  }, [])

  const renderHeaderLeft = () => {
    if (isSaving) {
      return <Icon source={closeDark} opacity={0.4} />
    }

    return <Icon onPress={handleClose} source={closeDark} />
  }

  const renderHeaderRight = () =>
    isSaving ? (
      <ActivityIndicator size="small" color="black" />
    ) : (
      <Text medium onPress={handleEditProject} hapticFeedback="impactLight">
        {t('EditProject:done')}
      </Text>
    )

  const renderHeaderCenter = () => (
    <Text medium numberOfLines={1}>{`${t('EditProject:headerTitle')} ${project.title}`}</Text>
  )

  const toggleActionSheet = () => {
    if (project.projectPermissions.isOwner) {
      Alert.alert(
        t('EditProject:deleteAlert'),
        t('EditProject:description'),
        [
          { text: t('EditProject:cancel'), style: 'cancel' },
          {
            onPress: onDelete,
            style: 'destructive',
            text: t('EditProject:delete'),
          },
        ],
        { cancelable: false }
      )
    }
  }

  return (
    <Fragment>
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
        </Inner>
        <Inner>
          <Title>{t('EditProject:projectSettings')}</Title>
          <SelectionItem
            type="switch"
            title={t('EditProject:disableComments')}
            selected={commentsDisabled}
            onPress={onSelectionChange}
          />

          <Spacing />

          <SelectionItem last title={t('EditProject:deleteTitle')} onPress={toggleActionSheet} />
        </Inner>
      </ScrollView>
    </Fragment>
  )
}

export default compose(
  deleteProject,
  editProject
)(EditProject)
