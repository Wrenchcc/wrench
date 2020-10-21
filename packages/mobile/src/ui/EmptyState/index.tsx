import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import Text from 'ui/Text'
import { TYPES } from './constants'
import { Base, Title, Description, Button } from './styles'

const onPressAction = (type: TYPES, showModal, params) => {
  switch (type) {
    case TYPES.PROJECT:
      return showModal(SCREENS.ADD_PROJECT, {
        options: {
          animations: {
            push: {
              waitForRender: true,
            },
          },
        },
      })
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

function EmptyState({ type = TYPES.PROJECT, params = {} }) {
  const { t } = useTranslation()
  const { showModal } = useNavigation()
  const handleNavigation = useCallback(() => onPressAction(type, showModal, params), [type])

  return (
    <Base>
      <Title>{t(`EmptyState:${type}:title`)}</Title>
      <Description color="neutral">{t(`EmptyState:${type}:description`)}</Description>
      {showButton(type) && (
        <Button onPress={handleNavigation}>
          <Text medium fontSize={15} color="black">
            {t(`EmptyState:${type}:button`)}
          </Text>
        </Button>
      )}
    </Base>
  )
}

export default EmptyState
