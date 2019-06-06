import React, { Fragment, useCallback } from 'react'
import { Subscribe } from 'unstated'
import { useTranslation } from 'react-i18next'
import { AddContainer } from 'store'
import { useNavigation, SCREENS } from 'navigation'
import { Title, Input, KeyboardAvoidingView } from 'ui'
import AddProjectHeader from 'features/project/components/AddProjectHeader'

function AddProject() {
  const { t } = useTranslation()
  const { navigate } = useNavigation()

  const handleOnChangeText = useCallback(value => updateField('title', value), [])

  return (
    <Subscribe to={[AddContainer]}>
      {({ state, updateField, resetState }) => (
        <Fragment>
          <AddProjectHeader
            actionRight={state.title && (() => navigate(SCREENS.ADD_PROJECT_TYPE))}
            resetState={resetState}
            closeAction
          />
          <KeyboardAvoidingView>
            <Title large numberOfLines={0} style={{ marginBottom: 80 }}>
              {t('AddProject:title')}
            </Title>
            <Input
              placeholder={t('AddProject:placeholder')}
              autoFocus
              large
              onChangeText={handleOnChangeText}
              value={state.title}
              borderColor="dark"
              color="dark"
              returnKeyType="next"
              enablesReturnKeyAutomatically
              onSubmitEditing={state.title && (() => navigate(SCREENS.ADD_PROJECT_TYPE))}
            />
          </KeyboardAvoidingView>
        </Fragment>
      )}
    </Subscribe>
  )
}

export default AddProject
