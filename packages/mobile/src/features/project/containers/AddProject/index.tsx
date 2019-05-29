import React, { Fragment } from 'react'
import { Subscribe } from 'unstated'
import { useTranslation } from 'react-i18next'
import { AddContainer } from 'store'
import { navigateToAddProjectType } from 'navigation/actions'
import { Title, Input, KeyboardAvoidingView } from 'ui'
import AddProjectHeader from 'features/project/components/AddProjectHeader'

function AddProject() {
  const { t } = useTranslation()

  return (
    <Subscribe to={[AddContainer]}>
      {({ state, updateField, resetState }) => (
        <Fragment>
          <AddProjectHeader
            actionRight={state.title && (() => navigateToAddProjectType())}
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
              onChangeText={value => updateField('title', value)}
              value={state.title}
              borderColor="dark"
              color="dark"
              returnKeyType="next"
              enablesReturnKeyAutomatically
              onSubmitEditing={state.title && (() => navigateToAddProjectType())}
            />
          </KeyboardAvoidingView>
        </Fragment>
      )}
    </Subscribe>
  )
}

export default AddProject
