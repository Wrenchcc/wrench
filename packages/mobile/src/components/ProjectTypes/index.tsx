import React, { useCallback, memo } from 'react'
import { sort } from 'rambda'
import { ScrollView } from 'react-native'
import { useProjectTypesQuery, useCurrentUserQuery } from '@wrench/common'
import { useNavigation, SCREENS } from 'navigation'
import { Text } from 'ui'
import CategoriesPlaceholder from './Placeholder'
import { Base, Wrapper } from './styles'

function ProjectTypes() {
  const { data: typesData, loading: loadingTypes } = useProjectTypesQuery()
  const { data: userData, loading: loadingUser } = useCurrentUserQuery()

  const { navigate } = useNavigation()

  const handleNavigation = useCallback((category) => {
    navigate(SCREENS.CATEGORIES, category)
  }, [])

  // const navigateToInsp = useCallback(() => {
  //   navigate(SCREENS.INSPIRATION, {
  //     options: {
  //       bottomTabs: {
  //         visible: false,
  //         animate: true,
  //       },
  //     },
  //   })
  // }, [])

  if (loadingTypes) {
    return (
      <Base>
        <CategoriesPlaceholder />
      </Base>
    )
  }

  const data = sort(
    (a) => (userData?.user.interestedIn.some((item) => item.id === a.id) ? -1 : 1),
    typesData.types
  )

  return (
    <Base>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* <Wrapper first onPress={navigateToInsp}>
          <Text fontSize={15} medium>
            Inspiration
          </Text>
        </Wrapper> */}

        {typesData.types.map((category, index) => (
          <Wrapper
            key={category.id}
            first={index === 0}
            last={index === typesData.types.length - 1}
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
}

export default memo(ProjectTypes)
