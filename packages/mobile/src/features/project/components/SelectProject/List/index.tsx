import React, { useCallback } from 'react'
import Animated, { FadeInUp, FadeOut } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import { Text } from 'ui'
import Project from '../Project'
import { Base, Scroll, NewProject } from './styles'

function List({ projects, onPress, onClose, selectedId }) {
  const { t } = useTranslation('select-project')
  const { showModal } = useNavigation()

  const handleNavigation = useCallback(() => {
    showModal(SCREENS.ADD_PROJECT)
    onClose()
  }, [onClose])

  const renderProjects = () =>
    projects
      ?.slice()
      .sort((a, b) => a.node.files.edges.length > b.node.files.edges.length)
      .reverse()
      .map(({ node }) => (
        <Project key={node.id} {...node} onPress={onPress} selected={selectedId === node.id} />
      ))

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
      <Base>
        <Scroll>{renderProjects()}</Scroll>
        <NewProject onPress={handleNavigation}>
          <Text medium>{t('create')}</Text>
        </NewProject>
      </Base>
    </Animated.View>
  )
}

export default List
