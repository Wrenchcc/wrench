import React from 'react'
import { View, ScrollView, Dimensions } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import { CardSmall, Text } from 'ui'

const { width } = Dimensions.get('window')

function UserProjects({ projects, spacingHorizontal }) {
  const { t } = useTranslation()
  if (!projects || projects.edges.length <= 1) {
    return null
  }

  const { navigate } = useNavigation()

  const renderItems = projects.edges.map(({ node }, index) => {
    const handleNavigation = () => {
      navigate(SCREENS.PROJECT, {
        id: node.id,
        project: node,
      })
    }

    return (
      <CardSmall
        key={node.id}
        onPress={handleNavigation}
        title={node.title}
        followers={node.followers.totalCount}
        image={node.cover}
        style={{
          marginRight: index === projects.edges.length - 1 ? 20 : 10, // Last item
          marginLeft: index === 0 ? 20 : 0, // First item
        }}
      />
    )
  })

  return (
    <View>
      <Text medium fontSize={21}>
        {t('UserProjects:title')}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          marginTop: 20,
          marginBottom: 50,
          marginRight: spacingHorizontal ? 0 : -20,
          marginLeft: spacingHorizontal ? 0 : -20,
          width,
        }}
      >
        {renderItems}
      </ScrollView>
    </View>
  )
}

export default UserProjects
