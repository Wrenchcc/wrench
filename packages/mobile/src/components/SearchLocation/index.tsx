import React, { useState, useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import Config from 'react-native-config'
import { Input, Text, NoResults, SearchingFor } from 'ui'
import { keyExtractor } from 'navigation'
import Footer from './Footer'
import { Base, Header, Center } from './styles'

const SEARCH_ENDPOINT = 'https://api.mapbox.com/geocoding/v5/mapbox.places'

function SearchLocation({ iconLeft, onPress, autoFocus = false }) {
  const { t } = useTranslation('search-location')
  const [searchTerm, setSearchTerm] = useState('')
  const [isFetching, setFetching] = useState(false)
  const [results, setResults] = useState([])

  async function fetchResult() {
    setFetching(true)

    const data = await fetch(
      `${SEARCH_ENDPOINT}/${encodeURIComponent(
        searchTerm
      )}.json?types=country%2Cregion%2Cplace&autocomplete=true&language=en&limit=10&access_token=${
        Config.MAPBOX_API_KEY
      }`
    )

    const result = await data.json()

    setFetching(false)
    setResults(result.features)
  }

  useEffect(() => {
    if (searchTerm) {
      fetchResult()
    } else {
      setResults([])
    }
  }, [searchTerm])

  const renderItem = ({ item }) => {
    return (
      <View style={{ height: 30, marginTop: 20 }}>
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
            placeholder={t('placeholder')}
            value={searchTerm}
            style={{ marginLeft: iconLeft ? 20 : 0, marginRight: 20 }}
            onChangeText={setSearchTerm}
            autoCorrect={false}
            returnKeyType="search"
            autoFocus={autoFocus}
          />
        </Center>
      </Header>

      <FlatList
        contentContainerStyle={{ paddingHorizontal: 20 }}
        style={{ flex: 1 }}
        data={results}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        ListFooterComponent={
          isFetching && searchTerm.length !== 0 ? (
            <SearchingFor query={searchTerm} />
          ) : (
            searchTerm.length > 0 && !results.length && <NoResults />
          )
        }
      />

      {!searchTerm.length && <Footer />}
    </Base>
  )
}

export default SearchLocation
