import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import withTranslation from 'i18n/withTranslation'
import { navigateToSearch, navigateBack } from 'navigation-old/actions'
import Search from 'ui/Search'
import Text from 'ui/Text'
import Add from 'features/project/components/Add'

const SearchBar = memo(function SearchBar({ placeholder, cancelButton, t, ...props }) {
  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
      <Search
        onPress={() => navigateToSearch()}
        style={{ flex: 1, paddingRight: 20 }}
        placeholder={placeholder}
        {...props}
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
})

SearchBar.propTypes = {
  placeholder: PropTypes.bool,
  cancelButton: PropTypes.bool,
}

export default withTranslation('SearchBar')(SearchBar)
