import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import { usePostStore } from 'store'
import { Header, Title, Text, Icon } from 'ui'
import { arrowLeft } from 'images'
import ProjectCategories from '../../components/ProjectCategories'

function AddProjectType() {
  const { t } = useTranslation()
  const { navigate, navigateBack } = useNavigation()
  const { update } = usePostStore(store => store.actions)
  const handleNavigation = useCallback(() => navigate(SCREENS.ADD_PROJECT_MODEL), [])

  const handleNavigationBack = useCallback(() => {
    navigateBack()
  }, [])

  const handleOnSelect = useCallback(
    type => {
      update('type', type)
      handleNavigation()
    },
    [update, handleNavigation]
  )

  return (
    <>
      <Header
        headerLeft={<Icon source={arrowLeft} onPress={handleNavigationBack} />}
        headerTitle={<Text medium>{t('AddProjectType:headerTitle')}</Text>}
      />
      <ProjectCategories
        ListHeaderComponent={
          <Title large numberOfLines={0} style={{ paddingHorizontal: 20, paddingVertical: 50 }}>
            {t('AddProjectType:title')}
          </Title>
        }
        onSelect={handleOnSelect}
      />
    </>
  )
}

export default AddProjectType
