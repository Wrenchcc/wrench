import React, { useState, useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import Config from 'react-native-config'
import { Input, Text, Loader } from 'ui'
import { useDebounce } from 'utils/hooks'
import Footer from './Footer'
import { Base, Header, Center } from './styles'

const SEARCH_ENDPOINT = 'https://api.mapbox.com/geocoding/v5/mapbox.places'

const keyExtractor = item => item.id

function SearchLocation({ iconLeft, onPress, autoFocus }) {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [focus, setFocus] = useState(false)
  const [results, setResults] = useState([])

  const query = useDebounce(searchTerm, 300)

  async function fetchResult() {
    const data = await fetch(
      `${SEARCH_ENDPOINT}/${encodeURIComponent(
        query
      )}.json?types=country%2Cregion%2Cplace&autocomplete=true&language=en&limit=10&access_token=${
        Config.MAPBOX_API_KEY
      }`
    )

    const result = await data.json()

    setResults(result.features)
  }

  useEffect(() => {
    if (query) {
      fetchResult()
    } else {
      setResults([])
    }
  }, [query])

  const renderItem = ({ item }) => {
    return (
      <View style={{ height: 50 }}>
        <Text
          key={item.id}
          color="dark"
          numberOfLines={1}
          medium
          fontSize={15}
          onPress={() => onPress(item)}
        >
          {item.place_name}
        </Text>
      </View>
    )
  }

  return (
    <Base>
      <Header>
        {iconLeft}

        <Center>
          <Input
            color="dark"
            placeholder={t('SearchLocation:placeholder')}
            value={searchTerm}
            style={{ marginLeft: iconLeft ? 20 : 0, marginRight: 20 }}
            onChangeText={setSearchTerm}
            autoCorrect={false}
            returnKeyType="search"
            autoFocus={autoFocus}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        </Center>
      </Header>

      <FlatList
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }}
        ListEmptyComponent={<Loader fullscreen />}
        style={{ flex: 1 }}
        data={results}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
      />

      {!focus && <Footer />}
    </Base>
  )
}

export default SearchLocation
