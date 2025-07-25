import React from 'react'
import { ScrollView, Dimensions } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import { CardSmall, Text } from 'ui'

const { width } = Dimensions.get('window')

function UserProjects({ projects }) {
  const { t } = useTranslation('user-projects')
  const { navigate } = useNavigation()

  if (!projects || projects.edges.length <= 1) {
    return null
  }

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
          marginLeft: index === 0 ? 20 : 0, // First item
          marginRight: index === projects.edges.length - 1 ? 20 : 10, // Last item
        }}
      />
    )
  })

  return (
    <>
      <Text medium fontSize={21}>
        {t('title')}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          marginBottom: 50,
          marginLeft: -20,
          marginRight: -20,
          marginTop: 20,
          width,
        }}
      >
        {renderItems}
      </ScrollView>
    </>
  )
}

export default UserProjects
