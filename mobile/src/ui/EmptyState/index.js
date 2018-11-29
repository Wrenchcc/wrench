import React from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'
import { navigateToAddProject, navigateToAddMedia } from 'navigation'
import { Text } from 'ui'
import { TYPES } from './constants'
import { Base, Title, Description, Button } from './styles'

// TODO: send data to routes
const onPressAction = type => {
  switch (type) {
    case TYPES.PROJECT:
      return navigateToAddProject()
    case TYPES.POST:
      return navigateToAddMedia()
    default:
      return null
  }
}

function EmptyState({ t, type = 'project' }) {
  return (
    <Base>
      <Title>{t(`EmptyState:${type}:title`)}</Title>
      <Description color="grey" lineHeight={25}>
        {t(`EmptyState:${type}:description`)}
      </Description>
      <Button onPress={() => onPressAction(type)}>
        <Text medium fontSize={15}>
          {t(`EmptyState:${type}:button`)}
        </Text>
      </Button>
    </Base>
  )
}

EmptyState.propTypes = {
  type: PropTypes.string,
}

export default withNamespaces('EmptyState')(EmptyState)
