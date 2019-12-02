import React, { useCallback } from 'react'
import { ScrollView } from 'react-native'
import { useNavigation, SCREENS } from 'navigation'
import { Text } from 'ui'
import { GET_PROJECT_TYPES, CURRENT_USER_QUERY, useQuery } from 'gql'
import { Wrapper } from './styles'

function ProjectTypes() {
  const { data: typesData, loading: loadingTypes } = useQuery(GET_PROJECT_TYPES)
  const { data: userData, loading: loadingUser } = useQuery(CURRENT_USER_QUERY)

  const { navigateTo } = useNavigation()

  const handleNavigation = useCallback(category => {
    navigateTo(SCREENS.CATEGORIES, category)
  }, [])

  if (loadingTypes || loadingUser) {
    return null
  }

  const data = typesData.types.sort((a, b) => {
    return userData.user.interestedIn.indexOf(a.id) > userData.user.interestedIn.indexOf(b.id)
      ? 1
      : -1
  })

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        paddingBottom: 10,
        backgroundColor: 'white',
      }}
    >
      {data.map((category, index) => (
        <Wrapper
          key={category.id}
          first={index === 0}
          last={index === data.length - 1}
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

export default ProjectTypes
