import React, { memo } from 'react'
import PropTypes from 'prop-types'
import withTranslation from 'i18n/withTranslation'
import { navigateToAddProject, navigateToAddMedia } from 'navigation-old/actions'
import Text from 'ui/Text'
import { TYPES } from './constants'
import { Base, Title, Description, Button } from './styles'

const onPressAction = (type, params) => {
  switch (type) {
    case TYPES.PROJECT:
      return navigateToAddProject(params)
    case TYPES.POST:
    case TYPES.PROJECT_POST:
      return navigateToAddMedia(params)
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

const EmptyState = memo(function EmptyState({ t, type = TYPES.PROJECT, params = {} }) {
  return (
    <Base>
      <Title>{t(`EmptyState:${type}:title`)}</Title>
      <Description color="grey">{t(`EmptyState:${type}:description`)}</Description>
      {showButton(type) && (
        <Button onPress={() => onPressAction(type, params)} hapticFeedback="impactLight">
          <Text medium fontSize={15}>
            {t(`EmptyState:${type}:button`)}
          </Text>
        </Button>
      )}
    </Base>
  )
})

EmptyState.propTypes = {
  type: PropTypes.string,
  params: PropTypes.object,
}

export default withTranslation('EmptyState')(EmptyState)
