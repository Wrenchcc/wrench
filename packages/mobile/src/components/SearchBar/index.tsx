import React, { useRef, useEffect, useCallback, memo } from 'react'
import { View, BackHandler, Keyboard } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { useTranslation } from 'react-i18next'
import { SCREENS, currentComponentName } from 'navigation'
import { useReactiveVar, store } from 'gql'
import { search, close } from 'images'
import { Input, Text, Icon } from 'ui'
import { FONTS } from 'ui/constants'
import PlatformColor from 'ui/PlatformColor'

const styles = {
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  inner: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 40,
  },
  text: {
    paddingLeft: 41,
    fontSize: 17,
  },
  input: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    position: 'relative',
    borderTopRightRadius: 1,
    borderBottomRightRadius: 1,
    borderBottomLeftRadius: 1,
    borderTopLeftRadius: 1,
    paddingLeft: 41,
    paddingBottom: 0,
    paddingTop: 0,
    paddingRight: 40,
    fontFamily: FONTS.REGULAR,
    fontsize: 17,
    backgroundColor: PlatformColor.placeholder,
    color: PlatformColor.inverse,
  },
  search: {
    position: 'absolute',
    left: 20,
    top: 12,
    width: 14,
    height: 14,
  },
  close: {
    position: 'absolute',
    right: 20,
    top: 14,
  },
  cancel: {
    marginLeft: 10,
  },
}

function SearchBar() {
  const inputRef = useRef(null)
  const { t } = useTranslation('search-bar')
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
    <View style={styles.base}>
      <View style={styles.inner}>
        <Input
          style={styles.input}
          ref={inputRef}
          autoCorrect={false}
          placeholder={t('placeholder')}
          keyboardAppearance="dark"
          returnKeyType="search"
          onFocus={handleFocus}
          onChangeText={handleQueryChange}
          value={query}
          placeholderTextColor={PlatformColor.neutral}
        />

        <Icon style={styles.search} source={search} color="accent" />

        {query.length > 0 && (
          <Icon
            style={styles.close}
            source={close}
            color="dark"
            width={12}
            height={12}
            onPress={clearQuery}
          />
        )}
      </View>

      {searchActive && (
        <Text medium onPress={handleCancel} style={styles.cancel}>
          {t('cancel')}
        </Text>
      )}
    </View>
  )
}

export default memo(SearchBar)
