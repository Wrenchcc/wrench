import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { translate } from 'react-i18next'
import { navigateToSearch, navigateBack } from 'navigation'
import { Search, Add, Text } from 'ui'

const SearchBar = ({ placeholder, cancelButton, t }) => (
  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
    <Search
      onPress={() => navigateToSearch()}
      style={{ flex: 1, paddingRight: 20 }}
      placeholder={placeholder}
    />
    {cancelButton ? (
      <Text onPress={() => navigateBack()} medium>
        {t('SearchBar:cancel')}
      </Text>
    ) : (
      <Add style={{ width: 20 }} />
    )}
  </View>
)

SearchBar.propTypes = {
  placeholder: PropTypes.bool,
  cancelButton: PropTypes.bool,
}

export default translate('SearchBar')(SearchBar)
