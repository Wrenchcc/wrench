import React, { useCallback, memo } from 'react'
import { ScrollView } from 'react-native'
// import { sort } from 'rambda'
import { useProjectTypesQuery } from '@wrench/common'
import { useNavigation, SCREENS } from 'navigation'
import { Text } from 'ui'
import { Wrapper } from './styles'

function ProjectTypes() {
  const { data: typesData, loading: loadingTypes } = useProjectTypesQuery()
  // const { data: userData, loading: loadingUser } = useCurrentUserQuery()

  const { navigate } = useNavigation()

  const handleNavigation = useCallback(category => {
    navigate(SCREENS.CATEGORIES, category)
  }, [])

  if (loadingTypes) {
    return null
  }

  // return null

  // const data = sort(
  //   a => (userData.user.interestedIn.some(item => item.id === a.id) ? -1 : 1),
  //   typesData.types
  // )

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: 'white',
      }}
    >
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
  )
}

export default memo(ProjectTypes)
