import React from 'react'
import PropTypes from 'prop-types'
import withLocalization from 'i18n/withLocalization'
import { navigateToAddProject, navigateToPost } from 'navigation'
import { Text } from 'ui'
import { Base, Title, Description, Button } from './styles'

const onPressAction = type => (type === 'project' ? navigateToAddProject() : navigateToPost())

const EmptyState = ({ t, type = 'project' }) => (
  <Base>
    <Title>{t(`.${type}.title`)}</Title>
    <Description color="grey" lineHeight={25}>
      {t(`.${type}.description`)}
    </Description>
    <Button onPress={() => onPressAction(type)}>
      <Text medium fontSize={15}>
        {t(`.${type}.button`)}
      </Text>
    </Button>
  </Base>
)

EmptyState.propTypes = {
  type: PropTypes.string,
}

export default withLocalization(EmptyState, 'EmptyState')
