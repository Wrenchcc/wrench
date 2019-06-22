import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useProjectStore } from 'store'
import { useNavigation, SCREENS } from 'navigation'
import { Header, Icon, Title, Text, Input, KeyboardAvoidingView } from 'ui'
import { closeDark } from 'images'

function AddProject() {
  const { t } = useTranslation()
  const { navigate, dismissModal } = useNavigation()

  const { update, title, hasTitle } = useProjectStore(store => ({
    hasTitle: !!store.title,
    title: store.title,
    update: store.actions.update,
  }))

  const handleNavigation = useCallback(() => {
    navigate(SCREENS.ADD_PROJECT_TYPE)
  }, [])

  const handleDismissModal = useCallback(() => {
    dismissModal()
  }, [])

  const onChangeText = useCallback(value => update('title', value), [update])

  return (
    <>
      <Header
        headerLeft={<Icon source={closeDark} onPress={handleDismissModal} />}
        headerTitle={<Text medium>{t('AddProject:headerTitle')}</Text>}
        headerRight={
          hasTitle && (
            <Text onPress={handleNavigation} medium>
              {t('AddProject:next')}
            </Text>
          )
        }
      />
      <KeyboardAvoidingView>
        <Title large numberOfLines={0} style={{ marginBottom: 80 }}>
          {t('AddProject:title')}
        </Title>
        <Input
          placeholder={t('AddProject:placeholder')}
          autoFocus
          large
          onChangeText={onChangeText}
          value={title}
          borderColor="dark"
          color="dark"
          returnKeyType="next"
          enablesReturnKeyAutomatically
          onSubmitEditing={title && (() => navigate(SCREENS.ADD_PROJECT_TYPE))}
        />
      </KeyboardAvoidingView>
    </>
  )
}

export default AddProject
