import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useProjectStore, PROJECT } from 'store'
import { useNavigation, SCREENS } from 'navigation'
import { Header, Icon, Title, Text, Input, KeyboardAvoidingView } from 'ui'
import { close } from 'images'

function AddProject() {
  const { t } = useTranslation()
  const { navigate, dismissModal } = useNavigation()

  const { update, title, hasTitle, reset } = useProjectStore(store => ({
    hasTitle: !!store.title,
    reset: store.actions.reset,
    title: store.title,
    update: store.actions.update,
  }))

  const handleNavigation = useCallback(() => {
    navigate(SCREENS.ADD_PROJECT_TYPE, {
      options: {
        topBar: {
          visible: false,
        },
      },
    })
  }, [])

  const handleDismissModal = useCallback(() => {
    if (hasTitle) {
      reset()
    }

    dismissModal()
  }, [hasTitle, reset])

  const onChangeText = useCallback(value => update(PROJECT.TITLE, value), [update])

  return (
    <>
      <Header
        headerLeft={<Icon source={close} color="dark" onPress={handleDismissModal} />}
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
