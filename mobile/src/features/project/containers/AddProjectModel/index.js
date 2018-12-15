import React from 'react'
import { InteractionManager, KeyboardAvoidingView, ActivityIndicator, View } from 'react-native'
import { compose } from 'react-apollo'
import { withNamespaces } from 'react-i18next'
import { Subscribe } from 'unstated'
import { addProject } from 'graphql/mutations/project/addProject'
import { navigateToAddMedia } from 'navigation'
import { AddContainer } from 'store'
import { Title, Input } from 'ui'
import { arrowLeft } from 'images'
import AddProjectHeader from 'features/project/components/AddProjectHeader'
import SearchModel from 'features/project/components/SearchModel'

function AddProjectModel({ t, addProject }) {
  return (
    <Subscribe to={[AddContainer]}>
      {({ state, updateField, resetState }) => state.isSaving ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator />
          </View>
      ) : (
          <>
            <AddProjectHeader
              actionRight={
                state.model
                && (() => {
                  updateField('isSaving', true)
                  addProject({
                    title: state.title,
                    projectTypeId: state.type.id,
                    modelId: state.model.id,
                  }).then(() => {
                    navigateToAddMedia()
                    InteractionManager.runAfterInteractions(resetState)
                  })
                })
              }
              translationKey="add"
              icon={arrowLeft}
            />
            <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={20}
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
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
                value={state.model ? `${state.model.brand.name} ${state.model.model}` : state.query}
                borderColor="dark"
                color="dark"
                returnKeyType="next"
                onFocus={() => updateField('isSearching', true)}
                onBlur={() => updateField('isSearching', false)}
              />
            </KeyboardAvoidingView>
          </>
      )
      }
    </Subscribe>
  )
}

export default compose(
  addProject,
  withNamespaces('AddProjectModel')
)(AddProjectModel)
