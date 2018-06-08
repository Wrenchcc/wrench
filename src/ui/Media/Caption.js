import React from 'react'
import PropTypes from 'prop-types'
import Text from 'ui/Text'

const Caption = ({ caption, style = {}, onPress, disabled = true }) => (
  <Text style={style} onPress={onPress} disabled={disabled} color="grey" lineHeight={25}>
    {caption}
  </Text>
)

Caption.propTypes = {
  caption: PropTypes.string.isRequired,
  style: PropTypes.any,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

export default Caption
