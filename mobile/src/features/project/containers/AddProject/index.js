import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { withNamespaces } from 'react-i18next'
import { Subscribe } from 'unstated'
import { AddProjectContainer } from 'store'
import { navigateToAddProjectType } from 'navigation'
import { Title, Input } from 'ui'
import AddProjectHeader from 'features/project/components/AddProjectHeader'

function AddProject({ t }) {
  return (
    <Subscribe to={[AddProjectContainer]}>
      {({ state, updateField }) => (
        <>
          <AddProjectHeader actionRight={state.title && (() => navigateToAddProjectType())} />
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
              onSubmitEditing={() => navigateToAddProjectType()}
            />
          </KeyboardAvoidingView>
        </>
      )}
    </Subscribe>
  )
}

export default withNamespaces('AddProject')(AddProject)
