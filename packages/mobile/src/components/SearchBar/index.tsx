import React, { useRef, useEffect, useCallback, memo } from 'react'
import { BackHandler, Keyboard } from 'react-native'
import { useTranslation } from 'react-i18next'
import { search, close } from 'images'
import { COLORS } from 'ui/constants'
import { Text } from 'ui'
import { Base, Inner, Input, SearchIcon, CloseIcon } from './styles'

function SearchBar({
  onChangeQuery,
  searchOpen,
  onSearchFocus,
  searchClosed,
  searchActive,
  onSearchCancel,
  query,
}) {
  const inputRef = useRef()
  const transitionRef = useRef()
  const { t } = useTranslation()

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
    value => {
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
          placeholderTextColor={COLORS.LIGHT_GREY}
          selectionColor={COLORS.DARK}
          placeholder={t('SearchBar:placeholder')}
          keyboardAppearance="dark"
          returnKeyType="search"
          onFocus={handleFocus}
          onChangeText={handleQueryChange}
          value={query}
        />

        <SearchIcon source={search} />

        {query.length > 0 && (
          <CloseIcon source={close} color="dark" width={12} height={12} onPress={clearQuery} />
        )}
      </Inner>

      {searchActive && (
        <Text medium onPress={handleCancel} style={{ marginLeft: 10 }}>
          {t('SearchBar:cancel')}
        </Text>
      )}
    </Base>
  )
}

export default memo(SearchBar)
