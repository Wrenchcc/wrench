import React, { useCallback, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'
import { useProjectTypesQuery } from '@wrench/common'
import { useNavigation, SCREENS } from 'navigation'
import { Text } from 'ui'
import CategoriesSkeleton from './Skeleton'
import { Base, Wrapper } from './styles'

function ProjectTypes({ visible }) {
  const { t } = useTranslation('project-types')
  const { data: typesData, loading: loadingTypes } = useProjectTypesQuery()

  const { navigate } = useNavigation()

  const handleNavigation = useCallback((category) => {
    navigate(SCREENS.CATEGORIES, category)
  }, [])

  const navigateToInsp = useCallback(() => {
    navigate(SCREENS.INSPIRATION, {
      options: {
        topBar: {
          visible: false,
        },
        statusBar: {
          visible: false,
          animated: true,
        },
        bottomTabs: {
          visible: false,
          animate: true,
        },
      },
    })
  }, [])

  if (!typesData?.types && loadingTypes) {
    return (
      <Base>
        <CategoriesSkeleton />
      </Base>
    )
  }

  return (
    visible && (
      <Base>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Wrapper first onPress={navigateToInsp}>
            <Text fontSize={15} medium>
              {t('inspo')}
            </Text>
          </Wrapper>

          {typesData.types.map((category, index) => (
            <Wrapper
              key={category.id}
              last={index === typesData.types?.length - 1}
              onPress={() => handleNavigation(category)}
            >
              <Text fontSize={15} medium>
                {category.title}
              </Text>
            </Wrapper>
          ))}
        </ScrollView>
      </Base>
    )
  )
}

export default memo(ProjectTypes)
