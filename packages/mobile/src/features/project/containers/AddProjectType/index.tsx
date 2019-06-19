import React, { useCallback } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import { useStore } from 'store'
import { Title } from 'ui'
import { arrowLeft } from 'images'
import AddProjectHeader from '../../components/AddProjectHeader'
import ProjectCategories from '../../components/ProjectCategories'

function AddProjectType() {
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const handleNavigation = useCallback(() => navigate(SCREENS.ADD_PROJECT_MODEL), [])

  const { updateField } = useStore(store => ({
    updateField: store.actions.updateField,
  }))

  return (
    <>
      <AddProjectHeader icon={arrowLeft} />
      <ProjectCategories
        ListHeaderComponent={
          <View
            style={{
              flex: 1,
              paddingTop: 30,
            }}
          >
            <Title large numberOfLines={0} style={{ paddingHorizontal: 20, paddingBottom: 50 }}>
              {t('AddProjectType:title')}
            </Title>
          </View>
        }
        onSelect={type => {
          updateField('type', type)
          handleNavigation()
        }}
      />
    </>
  )
}

export default AddProjectType
