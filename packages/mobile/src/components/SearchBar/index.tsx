import React, { useRef, useEffect, useCallback, memo } from 'react'
import { BackHandler, Keyboard } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { useTranslation } from 'react-i18next'
import { SCREENS, currentComponentName } from 'navigation'
import { useReactiveVar, store } from 'gql'
import { search, close } from 'images'
import { Text } from 'ui'
import { Base, Inner, Input, SearchIcon, CloseIcon } from './styles'
import { useDynamicColor } from 'utils/hooks'

function SearchBar() {
  const inputRef = useRef(null)
  const { t } = useTranslation('search-bar')
  const dynamicPlaceholderTextColor = useDynamicColor('neutral')
  const query = useReactiveVar(store.search.queryVar)
  const searchActive = useReactiveVar(store.search.activeVar)

  const handleFocus = useCallback(() => {
    store.search.setActive(true)
    return true
  }, [])

  const handleCancel = useCallback(() => {
    inputRef.current.blur()
    store.search.setQuery('')
    store.search.setActive(false)
    Keyboard.dismiss()
  }, [inputRef])

  const handleQueryChange = useCallback((value) => {
    store.search.setQuery(value)
  }, [])

  const clearQuery = useCallback(() => {
    store.search.setQuery('')
  }, [])

  // Close on duble tap
  useEffect(() => {
    const bottomTabEventListener = Navigation.events().registerBottomTabSelectedListener(
      ({ selectedTabIndex, unselectedTabIndex }) => {
        if (selectedTabIndex === unselectedTabIndex && currentComponentName === SCREENS.EXPLORE) {
          store.search.setQuery('')
          store.search.setActive(false)
        }
      }
    )

    return () => bottomTabEventListener.remove()
  }, [])

  // Close on android hardware button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (searchActive && currentComponentName === SCREENS.EXPLORE) {
        store.search.setQuery('')
        store.search.setActive(false)

        return true
      }

      return false
    })

    return () => backHandler.remove()
  }, [searchActive, currentComponentName])

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
