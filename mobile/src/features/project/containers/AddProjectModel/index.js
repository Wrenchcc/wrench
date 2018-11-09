import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { withNamespaces } from 'react-i18next'
import { Subscribe } from 'unstated'
import { navigateToAddMedia } from 'navigation'
import { AddProjectContainer } from 'store'
import { Title, Input } from 'ui'
import { arrowLeft } from 'images'
import AddProjectHeader from 'features/project/components/AddProjectHeader'
import SearchModel from 'features/project/components/SearchModel'

function AddProjectModel({ t }) {
  return (
    <Subscribe to={[AddProjectContainer]}>
      {({ state, updateField }) => (
        <>
          <AddProjectHeader
            actionRight={state.model && (() => navigateToAddMedia())}
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
              value={state.model ? `${state.model.brand} ${state.model.model}` : state.query}
              borderColor="dark"
              color="dark"
              returnKeyType="next"
              enablesReturnKeyAutomatically
              onSubmitEditing={() => console.log('here')}
            />
          </KeyboardAvoidingView>
        </>
      )}
    </Subscribe>
  )
}

export default withNamespaces('AddProjectModel')(AddProjectModel)
