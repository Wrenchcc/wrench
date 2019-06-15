import React, { useRef, useEffect, useCallback, memo } from 'react'
import { BackHandler, Keyboard } from 'react-native'
import { useTranslation } from 'react-i18next'
import { search } from 'images'
import { COLORS } from 'ui/constants'
import { Text } from 'ui'
import { Base, Input, Icon } from './styles'
import transition from './transition'

function Search({
  onChangeQuery,
  searchOpen,
  onSearchFocus,
  searchClosed,
  searchActive,
  onSearchCancel,
  query,
  ...props
}) {
  const inputRef = useRef(null)
  const transitionRef = useRef(null)
  const { t } = useTranslation()

  const handleFocus = useCallback(() => {
    transitionRef.current.animateNextTransition()

    if (onSearchFocus) {
      onSearchFocus()
    }

    return true
  }, [transitionRef, onSearchFocus])

  const handleCancel = useCallback(() => {
    inputRef.current.blur()
    transitionRef.current.animateNextTransition()

    Keyboard.dismiss()

    if (onSearchCancel) {
      onSearchCancel()
    }
  }, [inputRef, transitionRef, onSearchCancel])

  const handleQueryChange = useCallback(value => onChangeQuery(value), [onChangeQuery])

  useEffect(() => {
    if (searchOpen) {
      BackHandler.addEventListener('hardwareBackPress', handleCancel)
    }
    if (searchClosed) {
      BackHandler.removeEventListener('hardwareBackPress', handleCancel)
    }
  }, [searchActive, handleCancel])

  return (
    <Base ref={transitionRef} transition={transition}>
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
        {...props}
      />

      <Icon source={search} />

      {searchActive && (
        <Text medium onPress={handleCancel} style={{ marginLeft: 10 }}>
          {t('SearchBar:cancel')}
        </Text>
      )}
    </Base>
  )
}

export default memo(Search)
