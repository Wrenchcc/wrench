import React, { useCallback, memo } from 'react'
import { ScrollView } from 'react-native'
// import { sort } from 'ramda'
import { useNavigation, SCREENS } from 'navigation'
import { Text } from 'ui'
import { GET_PROJECT_TYPES, useQuery } from 'gql'
import { Wrapper } from './styles'

function ProjectTypes() {
  const { data: typesData, loading: loadingTypes } = useQuery(GET_PROJECT_TYPES)
  // const { data: userData, loading: loadingUser } = useQuery(CURRENT_USER_QUERY)

  const { navigateTo } = useNavigation()

  const handleNavigation = useCallback(category => {
    navigateTo(SCREENS.CATEGORIES, category)
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
