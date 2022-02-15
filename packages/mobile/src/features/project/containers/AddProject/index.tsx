import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useReactiveVar, store, PROJECT } from 'gql'
import { useNavigation, SCREENS } from 'navigation'
import { Header, Icon, Title, Text, Input, KeyboardAvoidingView } from 'ui'
import { close } from 'images'

function AddProject() {
  const { t } = useTranslation('add-project')
  const { navigate, dismissModal } = useNavigation()
  const { title } = useReactiveVar(store.project.projectVar)

  const handleNavigation = useCallback(() => {
    navigate(SCREENS.ADD_PROJECT_TYPE)
  }, [])

  const handleDismissModal = useCallback(() => {
    store.project.update(PROJECT.TITLE, null)
    dismissModal()
  }, [])

  const onChangeText = useCallback((value) => store.project.update(PROJECT.TITLE, value), [])

  return (
    <>
      <Header
        headerLeft={<Icon source={close} onPress={handleDismissModal} />}
        headerTitle={<Text medium>{t('headerTitle')}</Text>}
        headerRight={
          !!title && (
            <Text onPress={handleNavigation} medium>
              {t('next')}
            </Text>
          )
        }
      />
      <KeyboardAvoidingView keyboardVerticalOffset={20}>
        <Title large numberOfLines={0} style={{ marginBottom: 30 }}>
          {t('title')}
        </Title>

        <Input
          numberOfLines={1}
          placeholder={t('placeholder')}
          large
          onChangeText={onChangeText}
          value={title}
          autoFocus
          returnKeyType="next"
          enablesReturnKeyAutomatically
          onSubmitEditing={title && (() => navigate(SCREENS.ADD_PROJECT_TYPE))}
        />
      </KeyboardAvoidingView>
    </>
  )
}

export default AddProject
