import React, { useRef, useEffect } from 'react'
import { BackHandler, Keyboard } from 'react-native'
import { Transition } from 'react-native-reanimated'
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

  const handleFocus = () => {
    transitionRef.current.animateNextTransition()
    onSearchFocus && onSearchFocus()

    return true
  }

  const handleCancel = () => {
    inputRef.current.blur()
    Keyboard.dismiss()
    transitionRef.current.animateNextTransition()
    onSearchCancel && onSearchCancel()
  }

  useEffect(() => {
    if (searchOpen) {
      BackHandler.addEventListener('hardwareBackPress', handleCancel)
    }
    if (searchClosed) {
      BackHandler.removeEventListener('hardwareBackPress', handleCancel)
    }
  }, [searchActive])

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
        onChangeText={query => onChangeQuery(query)}
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

export default Search
