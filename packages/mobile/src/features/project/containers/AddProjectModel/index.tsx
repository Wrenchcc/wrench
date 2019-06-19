import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { addProject } from 'graphql/mutations/project/addProject'
import { useNavigation } from 'navigation'
import { useStore } from 'store'
import { Title, Input, KeyboardAvoidingView } from 'ui'
import { arrowLeft } from 'images'
import AddProjectHeader from 'features/project/components/AddProjectHeader'
import SearchModel from 'features/project/components/SearchModel'

function AddProjectModel({ addProject }) {
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const [query, setQuery] = useState()
  const [isSearching, setIsSearching] = useState(false)

  const { updateField, project } = useStore(store => ({
    updateField: store.actions.updateField,
    project: store.project,
  }))

  const handleNavigation = useCallback(() => {
    navigate(SCREENS.ADD_MEDIA)
  }, [])

  // const getActionRight = () => {
  //   if (project.model) {
  //     return () => {
  //       updateField('isSaving', true)
  //       addProject({
  //         title: project.title,
  //         projectTypeId: project.typeId,
  //         modelId: project.model.id,
  //       }).then(() => {
  //         handleNavigation()
  //         resetState
  //       })
  //     }
  //   }
  //
  //   return null
  // }

  const value = project.model
    ? `${project.model.brand.name} ${project.model.project.model} ${project.model.year}`
    : query

  return (
    <>
      {/*<AddProjectHeader
        actionRight={getActionRight}
        translationKey="add"
        icon={arrowLeft}
        isSaving={state.isSaving}
      />*/}
      <KeyboardAvoidingView>
        {isSearching && (
          <SearchModel query={query} onPress={model => updateField('model', model)} />
        )}

        <Title large numberOfLines={0} style={{ marginBottom: 80 }}>
          {t('AddProjectModel:title')}
        </Title>

        <Input
          placeholder={t('AddProjectModel:placeholder')}
          autoFocus
          waitForRender
          large
          onChangeText={setQuery}
          value={value}
          borderColor="dark"
          color="dark"
          returnKeyType="next"
          onFocus={() => setIsSearching(true)}
          onBlur={() => setIsSearching(false)}
        />
      </KeyboardAvoidingView>
    </>
  )
}

export default addProject(AddProjectModel)
