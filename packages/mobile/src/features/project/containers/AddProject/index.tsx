import React, { useCallback } from 'react'
import { useReactiveVar } from '@apollo/client'
import { useTranslation } from 'react-i18next'
import { projectVar, updateProjectVar, PROJECT } from 'gql'
import { useNavigation, SCREENS, ScrollView } from 'navigation'
import { Header, Icon, Title, Text, Input, KeyboardAvoidingView } from 'ui'
import { close } from 'images'

function AddProject() {
  const { t } = useTranslation()
  const { navigate, dismissModal } = useNavigation()
  const { title } = useReactiveVar(projectVar)

  const handleNavigation = useCallback(() => {
    updateProjectVar(PROJECT.TITLE, null)
    navigate(SCREENS.ADD_PROJECT_TYPE)
  }, [])

  const handleDismissModal = useCallback(() => {
    updateProjectVar(PROJECT.TITLE, null)
    dismissModal()
  }, [])

  const onChangeText = useCallback((value) => updateProjectVar(PROJECT.TITLE, value), [])

  return (
    <>
      <Header
        headerLeft={<Icon source={close} color="dark" onPress={handleDismissModal} />}
        headerTitle={<Text medium>{t('AddProject:headerTitle')}</Text>}
        headerRight={
          !!title && (
            <Text onPress={handleNavigation} medium>
              {t('AddProject:next')}
            </Text>
          )
        }
      />
      <KeyboardAvoidingView paddingHorizontal={0}>
        <ScrollView keyboardDismissMode="on-drag">
          <Title large numberOfLines={0} style={{ marginBottom: 80 }}>
            {t('AddProject:title')}
          </Title>
          <Input
            placeholder={t('AddProject:placeholder')}
            large
            onChangeText={onChangeText}
            value={title}
            borderColor="dark"
            color="dark"
            returnKeyType="next"
            enablesReturnKeyAutomatically
            onSubmitEditing={title && (() => navigate(SCREENS.ADD_PROJECT_TYPE))}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

export default AddProject
