import React, { useCallback, useRef, useEffect } from 'react'
import { Animated, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import { Text } from 'ui'
import Project from '../Project'
import { Base, Scroll, NewProject, SPACER, BUTTON_HEIGHT, ITEM_HEIGHT } from './styles'

function List({ projects, onPress, onClose, open, selectedId }) {
  const { t } = useTranslation()
  const animatedValue = useRef(new Animated.Value(0))
  const { showModal } = useNavigation()

  const handleNavigation = useCallback(() => {
    showModal(SCREENS.ADD_PROJECT, {
      options: {
        topBar: {
          visible: false,
        },
      },
    })
    onClose()
  }, [onClose])

  const getHeight = useCallback(() => {
    const itemCount = Object.keys(projects).length
    const itemsHeight = itemCount >= 4 ? 4 : itemCount
    return itemsHeight * ITEM_HEIGHT + BUTTON_HEIGHT + SPACER
  }, [projects])

  useEffect(() => {
    Animated.spring(animatedValue.current, {
      bounciness: 0,
      speed: 7,
      toValue: open ? getHeight() : 0,
    }).start()
  }, [open])

  const renderProjects = () =>
    projects
      .slice()
      .sort((a, b) => a.node.files.edges.length > b.node.files.edges.length)
      .reverse()
      .map(({ node }) => (
        <Project key={node.id} {...node} onPress={onPress} selected={selectedId === node.id} />
      ))

  return (
    <>
      <Animated.View
        style={{
          height: animatedValue.current,
          overflow: 'hidden',
          position: 'absolute',
          width: '100%',
          zIndex: 10,
        }}
      >
        <Base>
          <Scroll>{renderProjects()}</Scroll>
          <NewProject onPress={handleNavigation} nativeHandler>
            <Text medium>{t('SelectProject:create')}</Text>
          </NewProject>
        </Base>
      </Animated.View>

      {open && (
        <TouchableOpacity
          onPress={onClose}
          style={{
            height: '100%',
            overflow: 'hidden',
            position: 'absolute',
            width: '100%',
            zIndex: 1,
            bottom: 0,
          }}
        />
      )}
    </>
  )
}

export default List
