import React from 'react'
import { useTranslation } from 'react-i18next'
import { useProjectStore } from 'store'
import { useNavigation, SCREENS } from 'navigation'
import { Header, Title, Input, KeyboardAvoidingView } from 'ui'

function AddProject() {
  const { t } = useTranslation()
  const { navigate } = useNavigation()

  const { update, title } = useProjectStore(store => ({
    update: store.actions.update,
    title: store.title,
  }))

  return (
    <>
      {/*<Header
        actionRight={title && (() => navigate(SCREENS.ADD_PROJECT_TYPE))}
        resetState={resetState}
        closeAction
      />*/}
      <KeyboardAvoidingView>
        <Title large numberOfLines={0} style={{ marginBottom: 80 }}>
          {t('AddProject:title')}
        </Title>
        <Input
          placeholder={t('AddProject:placeholder')}
          autoFocus
          large
          onChangeText={value => update('title', value)}
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
