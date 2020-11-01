import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import { store, PROJECT } from 'gql'
import { Header, Title, Text, Icon } from 'ui'
import { arrowLeft } from 'images'
import ProjectCategories from '../../components/ProjectCategories'

function AddProjectType() {
  const { t } = useTranslation('add-project-type')
  const { navigate, navigateBack } = useNavigation()

  const handleNavigation = useCallback(
    () =>
      navigate(SCREENS.ADD_PROJECT_MODEL, {
        options: {
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
    (type) => {
      store.project.update(PROJECT.TYPE, type.id)
      handleNavigation()
    },
    [handleNavigation]
  )

  return (
    <>
      <Header
        headerLeft={<Icon source={arrowLeft} onPress={handleNavigationBack} />}
        headerTitle={<Text medium>{t('headerTitle')}</Text>}
      />
      <ProjectCategories
        ListHeaderComponent={
          <Title large numberOfLines={0} style={{ paddingHorizontal: 20, paddingVertical: 50 }}>
            {t('title')}
          </Title>
        }
        onSelect={handleOnSelect}
      />
    </>
  )
}

export default AddProjectType
