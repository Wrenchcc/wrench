import React, { memo } from 'react'
import PropTypes from 'prop-types'
import withTranslation from 'i18n/withTranslation'
import { search } from 'images'
import { COLORS } from 'ui/constants'
import { Base, Input, Icon, Placeholder, Text } from './styles'

const Search = memo(function Search({ t, style, onPress, placeholder = true, ...props }) {
  return (
    <Base style={style}>
      {placeholder ? (
        <Placeholder onPress={onPress} activeOpacity={1}>
          <Text color="light_grey">{t('Search:placeholder')}</Text>
        </Placeholder>
      ) : (
        <Input
          autoFocus
          autoCorrect={false}
          placeholderTextColor={COLORS.LIGHT_GREY}
          placeholder={t('Search:placeholder')}
          keyboardAppearance="dark"
          returnKeyType="search"
          {...props}
        />
      )}
      <Icon source={search} />
    </Base>
  )
})

Search.propTypes = {
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  placeholder: PropTypes.bool,
}

export default withTranslation('Search')(Search)
