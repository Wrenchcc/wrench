import React, { useCallback } from 'react'
import { View, ScrollView } from 'react-native'
import Animated, { FadeInUp, FadeOut } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS, TOTAL_TOP_BAR_HEIGHT } from 'navigation'
import { Text, Touchable } from 'ui'
import Project from '../Project'
import PlatformColor from 'ui/PlatformColor'

const BUTTON_HEIGHT = 70
const ITEM_HEIGHT = 65

const styles = {
  base: {
    backgroundColor: PlatformColor.default,
    paddingTop: TOTAL_TOP_BAR_HEIGHT,
  },
  scroll: {
    paddingLeft: 20,
    paddingRight: 20,
    maxHeight: ITEM_HEIGHT * 4,
  },
  new: {
    height: BUTTON_HEIGHT,
    paddingTop: 12,
    paddingLeft: 20,
    paddingRight: 20,
  },
}

function List({ projects, onPress, onClose }) {
  const { t } = useTranslation('select-project')
  const { showModal } = useNavigation()

  const handleNavigation = useCallback(() => {
    showModal(SCREENS.ADD_PROJECT)
    onClose()
  }, [onClose])

  const renderProjects = useCallback(
    () =>
      projects
        ?.slice()
        .sort((a, b) => a.node.files.edges.length > b.node.files.edges.length)
        .reverse()
        .map(({ node }) => <Project key={node.id} {...node} onPress={onPress} />),
    [projects]
  )

  return (
    <Animated.View
      entering={FadeInUp.duration(200)}
      exiting={FadeOut.duration(200)}
      style={{
        position: 'absolute',
        width: '100%',
        zIndex: 10,
      }}
    >
      <View style={styles.base}>
        <ScrollView style={styles.scroll}>{renderProjects()}</ScrollView>
        <Touchable onPress={handleNavigation} style={styles.new}>
          <Text medium>{t('create')}</Text>
        </Touchable>
      </View>
    </Animated.View>
  )
}

export default List
