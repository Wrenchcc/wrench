import React, { useCallback, useRef, useEffect } from 'react'
import { Animated, InteractionManager } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import { Text } from 'ui'
import Project from './Project'
import { Base, Scroll, NewProject, SPACER, BUTTON_HEIGHT, ITEM_HEIGHT } from './styles'

function SelectProject({ projects, onPress, selectedProjectId, onClose, expanded }) {
  const { t } = useTranslation()
  const animatedValue = useRef(new Animated.Value(0))
  const { showModal } = useNavigation()

  const handleNavigation = useCallback(() => {
    showModal(SCREENS.ADD_PROJECT)
    InteractionManager.runAfterInteractions(() => {
      onClose()
    })
  }, [onClose])

  const getHeight = useCallback(() => {
    const itemCount = Object.keys(projects).length
    const itemsHeight = itemCount >= 4 ? 4 : itemCount
    return itemsHeight * ITEM_HEIGHT + BUTTON_HEIGHT + SPACER
  }, [projects])

  useEffect(() => {
    Animated.spring(animatedValue.current, {
      toValue: expanded ? getHeight() : 0,
      bounciness: 0,
      speed: 7,
    }).start()
  }, [expanded])

  const renderProjects = () =>
    projects
      .slice()
      .sort((a, b) => a.node.files.edges.length > b.node.files.edges.length)
      .reverse()
      .map(({ node }) => (
        <Project
          key={node.id}
          {...node}
          onPress={onPress}
          selected={selectedProjectId === node.id}
        />
      ))

  return (
    <Animated.View
      style={{
        position: 'absolute',
        overflow: 'hidden',
        width: '100%',
        zIndex: 10,
        height: animatedValue.current,
      }}
    >
      <Base>
        <Scroll>{renderProjects()}</Scroll>
        <NewProject onPress={handleNavigation}>
          <Text medium>{t('SelectProject:create')}</Text>
        </NewProject>
      </Base>
    </Animated.View>
  )
}

export default SelectProject
