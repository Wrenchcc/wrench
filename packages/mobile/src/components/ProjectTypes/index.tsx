import React, { useCallback } from 'react'
import { ScrollView } from 'react-native'
import { useNavigation, SCREENS } from 'navigation'
import { Text } from 'ui'
import { GET_PROJECT_TYPES, useQuery } from 'gql'
import { Wrapper } from './styles'

function ProjectTypes() {
  const { data, loading } = useQuery(GET_PROJECT_TYPES)
  const { navigateTo } = useNavigation()

  const handleNavigation = useCallback(category => {
    navigateTo(SCREENS.CATEGORIES, category)
  }, [])

  if (loading) {
    return null
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        paddingBottom: 10,
        backgroundColor: 'white',
      }}
    >
      {data.types.map((category, index) => (
        <Wrapper
          key={category.id}
          first={index === 0}
          last={index === data.types.length - 1}
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
