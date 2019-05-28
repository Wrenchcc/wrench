import React from 'react'
import { useTranslation } from 'react-i18next'
import { InteractionManager } from 'react-native'
import { Subscribe } from 'unstated'
import { addProject } from 'graphql/mutations/project/addProject'
import { navigateToAddMedia } from 'navigation/actions'
import { AddContainer } from 'store'
import { Title, Input, KeyboardAvoidingView } from 'ui'
import { arrowLeft } from 'images'
import AddProjectHeader from 'features/project/components/AddProjectHeader'
import SearchModel from 'features/project/components/SearchModel'

function getActionRight(state, addProject, updateField, resetState) {
  if (state.model) {
    return () => {
      updateField('isSaving', true)
      addProject({
        title: state.title,
        projectTypeId: state.type.id,
        modelId: state.model.id,
      }).then(() => {
        navigateToAddMedia()
        InteractionManager.runAfterInteractions(resetState)
      })
    }
  }

  return null
}

function AddProjectModel({ addProject }) {
  const { t } = useTranslation()

  return (
    <Subscribe to={[AddContainer]}>
      {({ state, updateField, resetState }) => (
        <>'         '<AddProjectHeader
            actionRight={getActionRight(state, addProject, updateField, resetState)}
            translationKey="add"
            icon={arrowLeft}
            isSaving={state.isSaving}
          />'         '<KeyboardAvoidingView>
            {state.isSearching && (
              <SearchModel query={state.query} onPress={model => updateField('model', model)} />
            )}

            <Title large numberOfLines={0} style={{ marginBottom: 80 }}>
              {t('AddProjectModel:title')}
            </Title>

            <Input
              placeholder={t('AddProjectModel:placeholder')}
              autoFocus
              large
              onChangeText={value => updateField('query', value)}
              value={
                state.model
                  ? `${state.model.brand.name} ${state.model.model} ${state.model.year}`
                  : state.query
              }
              borderColor="dark"
              color="dark"
              returnKeyType="next"
              onFocus={() => updateField('isSearching', true)}
              onBlur={() => updateField('isSearching', false)}
            />
          </KeyboardAvoidingView>'       '</>
      )}
    </Subscribe>
  )
}

export default addProject(AddProjectModel)
