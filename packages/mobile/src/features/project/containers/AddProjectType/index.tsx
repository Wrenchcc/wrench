import React, { useCallback } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import { usePostStore } from 'store'
import { Header, Title } from 'ui'
import { arrowLeft } from 'images'
import ProjectCategories from '../../components/ProjectCategories'

function AddProjectType() {
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const handleNavigation = useCallback(() => navigate(SCREENS.ADD_PROJECT_MODEL), [])
  const { update } = usePostStore(store => store.actions)

  const handleOnSelect = useCallback(
    type => {
      update('type', type)
      handleNavigation()
    },
    [update, handleNavigation]
  )

  return (
    <>
      <Header icon={arrowLeft} />
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
        onSelect={handleOnSelect}
      />
    </>
  )
}

export default AddProjectType
