import React, { useCallback, memo } from 'react'
import { sort } from 'rambda'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'
import { useProjectTypesQuery, useCurrentUserQuery } from '@wrench/common'
import { useNavigation, SCREENS } from 'navigation'
import { Text } from 'ui'
import CategoriesPlaceholder from './Placeholder'
import { Base, Wrapper } from './styles'

function ProjectTypes({ visible }) {
  const { t } = useTranslation('project-types')
  const { data: typesData, loading: loadingTypes } = useProjectTypesQuery()
  const { data: userData } = useCurrentUserQuery()

  const { navigate } = useNavigation()

  const handleNavigation = useCallback((category) => {
    navigate(SCREENS.CATEGORIES, category)
  }, [])

  const navigateToInsp = useCallback(() => {
    navigate(SCREENS.INSPIRATION, {
      options: {
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
        <CategoriesPlaceholder />
      </Base>
    )
  }

  const data = sort(
    (a) => (userData?.user.interestedIn.some((item) => item.id === a.id) ? -1 : 1),
    typesData?.types
  )

  return (
    visible && (
      <Base>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Wrapper first onPress={navigateToInsp}>
            <Text fontSize={15} medium>
              {t('inspo')}
            </Text>
          </Wrapper>

          {data.map((category, index) => (
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
