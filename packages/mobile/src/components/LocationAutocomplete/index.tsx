import React, { useState, useCallback, useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import Config from 'react-native-config'
import { Input, Text } from 'ui'
import { useDebounce } from 'utils/hooks'
import { Base } from './styles'

const SEARCH_ENDPOINT = 'https://api.mapbox.com/geocoding/v5/mapbox.places'

const keyExtractor = item => item.id

function LocationAutocomplete() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])

  const query = useDebounce(searchTerm, 300)

  async function fetchResult() {
    const data = await fetch(
      `${SEARCH_ENDPOINT}/${encodeURIComponent(
        query
      )}.json?types=country%2Cregion%2Cplace&autocomplete=true&language=en&access_token=${
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

  const renderItem = ({ item }) => (
    <View style={{ height: 50 }}>
      <Text key={item.id} color="dark" numberOfLines={1} medium fontSize={15}>
        {item.place_name}
      </Text>
    </View>
  )

  return (
    <Base>
      <Input
        color="dark"
        placeholder={t('LocationAutocomplete:placeholder')}
        value={searchTerm}
        autoFocus
        style={{ marginLeft: 60, marginRight: 20 }}
        onChangeText={setSearchTerm}
      />

      <FlatList
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }}
        style={{ flex: 1 }}
        data={results}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        keyboardDismissMode="on-drag"
      />
    </Base>
  )
}

export default LocationAutocomplete
