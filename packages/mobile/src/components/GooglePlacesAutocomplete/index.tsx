import React, { useState, useCallback, useEffect } from 'react'
import { FlatList, View } from 'react-native'
import Config from 'react-native-config'
import { Input, Text } from 'ui'
import { useDebounce } from 'utils/hooks'

const GOOGLE_PLACES_ENDPOINT = 'https://maps.googleapis.com/maps/api/place/autocomplete'

function GooglePlacesAutocomplete() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])

  const query = useDebounce(searchTerm, 500)

  async function fetchResult() {
    const data = await fetch(
      `${GOOGLE_PLACES_ENDPOINT}/json?&input=${encodeURIComponent(query)}&key=${
        Config.GOOGLE_PLACES_API_KEY
      }`
    )

    const result = await data.json()
    if (result.status === 'OK') {
      setResults(result.predictions)
    }
  }

  useEffect(() => {
    if (query) {
      fetchResult()
    } else {
      setResults([])
    }
  }, [query])

  return (
    <>
      <Input
        color="dark"
        placeholder="Search location"
        value={searchTerm}
        autoFocus
        style={{ marginLeft: 20 }}
        onChangeText={setSearchTerm}
      />

      <FlatList
        style={{ flex: 1 }}
        data={results}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ height: 50, backgroundColor: 'black' }}>
            <Text key={item.id}>{item.description}</Text>
          </View>
        )}
      />
    </>
  )
}

export default GooglePlacesAutocomplete
