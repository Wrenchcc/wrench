import React from 'react'
import withTranslation from 'i18n/withTranslation'
import { Subscribe } from 'unstated'
import { AddContainer } from 'store'
import { navigateToAddProjectType } from 'navigation/actions'
import { Title, Input, KeyboardAvoidingView } from 'ui'
import AddProjectHeader from 'features/project/components/AddProjectHeader'

function AddProject({ t }) {
  return (
    <Subscribe to={[AddContainer]}>
      {({ state, updateField, resetState }) => (
        <>
          <AddProjectHeader
            actionRight={state.title && (() => navigateToAddProjectType())}
            resetState={resetState}
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
        </>
      )}
    </Subscribe>
  )
}

export default withTranslation('AddProject')(AddProject)
