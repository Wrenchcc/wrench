import React from 'react'
import PropTypes from 'prop-types'
import withLocalization from 'i18n/withLocalization'
import { COLORS } from 'ui/constants'
import Text from 'ui/Text'
import { Base, Input, Button } from './styles'

const CommentField = ({ t, disabled, onSubmit, inputRef, ...props }) => (
  <Base>
    <Input
      placeholder={t('.placeholder')}
      placeholderTextColor={COLORS.LIGHT_GREY}
      onSubmitEditing={(!disabled && onSubmit) || null}
      keyboardType="twitter"
      inputRef={inputRef}
      {...props}
    />
    {!disabled && (
      <Button onPress={onSubmit}>
        <Text medium>{t('.post')}</Text>
      </Button>
    )}
  </Base>
)

CommentField.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  inputRef: PropTypes.func,
}

export default withLocalization(CommentField, 'CommentField')
