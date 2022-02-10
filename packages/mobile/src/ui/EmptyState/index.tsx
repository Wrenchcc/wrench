import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import Text from 'ui/Text'
import { TYPES } from './constants'
import { Base, Title, Description, Button } from './styles'

const onPressAction = (type: TYPES, showModal, params) => {
  switch (type) {
    case TYPES.PROJECT:
      return showModal(SCREENS.ADD_PROJECT)
    case TYPES.POST:
    case TYPES.PROJECT_POST:
      return showModal(SCREENS.ADD_MEDIA, params)
    case TYPES.COLLECTION_POST:
      return showModal(SCREENS.ADD_POST_TO_COLLECTION, params)
    default:
      return null
  }
}

const showButton = (type) => {
  switch (type) {
    case TYPES.PROJECT:
    case TYPES.POST:
    case TYPES.PROJECT_POST:
    case TYPES.COLLECTION_POST:
      return true
    default:
      return false
  }
}

// t('collection-no-post.title')
// t('collection-no-post.description')

// t('collection-post.title')
// t('collection-post.description')
// t('collection-post.button')

// t('project.title')
// t('project.description')
// t('project.button')

// t('post.title')
// t('post.description')
// t('post.button')

// t('project-no-post.title')
// t('project-no-post.description')

// t('project-post.title')
// t('project-post.description')
// t('project-post.button')

// t('notifications.title')
// t('notifications.description')

function EmptyState({ type = TYPES.PROJECT, params = {}, style = {} }) {
  const { t } = useTranslation('empty-state')
  const { showModal } = useNavigation()
  const handleNavigation = useCallback(() => onPressAction(type, showModal, params), [type])

  return (
    <Base style={style}>
      <Title>{t(`${type}.title`)}</Title>
      <Description color="neutral">{t(`${type}.description`)}</Description>
      {showButton(type) && (
        <Button onPress={handleNavigation}>
          <Text medium fontSize={15} color="black">
            {t(`${type}.button`)}
          </Text>
        </Button>
      )}
    </Base>
  )
}

export default EmptyState
