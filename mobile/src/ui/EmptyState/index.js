import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { navigateToEditProject, navigateToPost } from 'navigation'
import { Text } from 'ui'
import { TYPES } from './constants'
import { Base, Title, Description, Button } from './styles'

// TODO: send data to routes
const onPressAction = type => {
  switch (type) {
    case TYPES.PROJECT:
      return () => navigateToEditProject()
    case TYPES.POST:
      return () => navigateToPost()
    default:
      return null
  }
}

const EmptyState = ({ t, type = 'project' }) => (
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

EmptyState.propTypes = {
  type: PropTypes.string,
}

export default translate('EmptyState')(EmptyState)
