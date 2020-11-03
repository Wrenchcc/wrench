import React, { useRef, useEffect, useCallback, memo } from 'react'
import { BackHandler, Keyboard } from 'react-native'
import { useTranslation } from 'react-i18next'
import { search, close } from 'images'
import { Text } from 'ui'
import { Base, Inner, Input, SearchIcon, CloseIcon } from './styles'
import { useDynamicColor } from 'utils/hooks'

function SearchBar({
  onChangeQuery,
  searchOpen,
  onSearchFocus,
  searchClosed,
  searchActive,
  onSearchCancel,
  query,
}) {
  const inputRef = useRef(null)
  const { t } = useTranslation('search-bar')
  const dynamicPlaceholderTextColor = useDynamicColor('neutral')

  const handleFocus = useCallback(() => {
    if (onSearchFocus) {
      onSearchFocus()
    }

    return true
  }, [onSearchFocus])

  const handleCancel = useCallback(() => {
    inputRef.current.blur()

    Keyboard.dismiss()

    if (onSearchCancel) {
      onSearchCancel()
    }
  }, [inputRef, onSearchCancel])

  const handleQueryChange = useCallback(
    (value) => {
      onChangeQuery(value)
    },
    [onChangeQuery]
  )

  const clearQuery = useCallback(() => {
    onChangeQuery('')
  }, [onChangeQuery])

  useEffect(() => {
    if (searchOpen) {
      BackHandler.addEventListener('hardwareBackPress', handleCancel)
    }
    if (searchClosed) {
      BackHandler.removeEventListener('hardwareBackPress', handleCancel)
    }
  }, [searchActive, handleCancel])

  return (
    <Base>
      <Inner>
        <Input
          ref={inputRef}
          autoCorrect={false}
          placeholder={t('placeholder')}
          keyboardAppearance="dark"
          returnKeyType="search"
          onFocus={handleFocus}
          onChangeText={handleQueryChange}
          value={query}
          placeholderTextColor={dynamicPlaceholderTextColor}
        />

        <SearchIcon source={search} color="accent" />

        {query.length > 0 && (
          <CloseIcon source={close} color="dark" width={12} height={12} onPress={clearQuery} />
        )}
      </Inner>

      {searchActive && (
        <Text medium onPress={handleCancel} style={{ marginLeft: 10 }}>
          {t('cancel')}
        </Text>
      )}
    </Base>
  )
}

export default memo(SearchBar)
