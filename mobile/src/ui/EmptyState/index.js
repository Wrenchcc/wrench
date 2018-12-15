import React from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'
import { navigateToAddProject, navigateToAddMedia } from 'navigation'
import { Text } from 'ui'
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

function EmptyState({ t, type = TYPES.PROJECT, params = {} }) {
  return (
    <Base>
      <Title>{t(`EmptyState:${type}:title`)}</Title>
      <Description color="grey" lineHeight={25}>
        {t(`EmptyState:${type}:description`)}
      </Description>
      {showButton(type) && (
        <Button onPress={() => onPressAction(type, params)}>
          <Text medium fontSize={15}>
            {t(`EmptyState:${type}:button`)}
          </Text>
        </Button>
      )}
    </Base>
  )
}

EmptyState.propTypes = {
  type: PropTypes.string,
  params: PropTypes.object,
}

export default withNamespaces('EmptyState')(EmptyState)
