import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import { useProjectStore, PROJECT } from 'store'
import { Header, Title, Text, Icon } from 'ui'
import { arrowLeft } from 'images'
import ProjectCategories from '../../components/ProjectCategories'

function AddProjectType() {
  const { t } = useTranslation()
  const { navigate, navigateBack } = useNavigation()
  const { update } = useProjectStore(store => store.actions)
  const handleNavigation = useCallback(
    () =>
      navigate(SCREENS.ADD_PROJECT_MODEL, {
        options: {
          topBar: {
            visible: false,
          },
          animations: {
            push: {
              waitForRender: true,
            },
          },
        },
      }),
    []
  )

  const handleNavigationBack = useCallback(() => {
    navigateBack()
  }, [])

  const handleOnSelect = useCallback(
    type => {
      update(PROJECT.TYPE, type.id)
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
