import React, { useCallback } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import { Title } from 'ui'
import { arrowLeft } from 'images'
import AddProjectHeader from 'features/project/components/AddProjectHeader'
import ProjectCategories from 'features/project/components/ProjectCategories'

function AddProjectType() {
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const handleNavigation = useCallback(() => navigate(SCREENS.ADD_PROJECT_MODEL), [])

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
            <Title
              large
              numberOfLines={0}
              style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 50 }}
            >
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
