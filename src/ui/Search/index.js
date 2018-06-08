import React from 'react'
import PropTypes from 'prop-types'
import withLocalization from 'i18n/withLocalization'
import { search } from 'images'
import { COLORS } from 'ui/constants'
import { Base, Input, Icon, Placeholder, Text } from './styles'

const Search = ({ t, style, onPress, placeholder = true, ...props }) => (
  <Base style={style}>
    <Icon source={search} />
    {placeholder ? (
      <Placeholder onPress={onPress} activeOpacity={1}>
        <Text color="light_grey">{t('.placeholder')}</Text>
      </Placeholder>
    ) : (
      <Input
        autoFocus
        autoCorrect={false}
        placeholderTextColor={COLORS.LIGHT_GREY}
        selectionColor={COLORS.DARK}
        placeholder={t('.placeholder')}
        keyboardAppearance="dark"
        returnKeyType="search"
        {...props}
      />
    )}
  </Base>
)

Search.propTypes = {
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  placeholder: PropTypes.bool,
}

export default withLocalization(Search, 'Search')
