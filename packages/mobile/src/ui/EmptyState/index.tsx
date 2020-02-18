import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation, SCREENS } from 'navigation'
import Text from 'ui/Text'
import { TYPES } from './constants'
import { Base, Title, Description, Button } from './styles'

const onPressAction = (type, showModal) => {
  switch (type) {
    case TYPES.PROJECT:
      return showModal(SCREENS.ADD_PROJECT)
    case TYPES.POST:
    case TYPES.PROJECT_POST:
      return showModal(SCREENS.ADD_MEDIA)
    default:
      return null
  }
}

const showButton = type => {
  switch (type) {
    case TYPES.PROJECT:
    case TYPES.POST:
    case TYPES.PROJECT_POST:
      return true
    default:
      return false
  }
}

function EmptyState({ type = TYPES.PROJECT }) {
  const { t } = useTranslation()
  const { showModal } = useNavigation()
  const handleNavigation = useCallback(() => onPressAction(type, showModal), [type])

  return (
    <Base>
      <Title>{t(`EmptyState:${type}:title`)}</Title>
      <Description color="grey">{t(`EmptyState:${type}:description`)}</Description>
      {showButton(type) && (
        <Button onPress={handleNavigation}>
          <Text medium fontSize={15}>
            {t(`EmptyState:${type}:button`)}
          </Text>
        </Button>
      )}
    </Base>
  )
}

export default EmptyState
