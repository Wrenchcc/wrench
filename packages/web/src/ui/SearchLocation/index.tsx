// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'i18n'
import { Input } from 'ui'
import { useDebounce, useClickOutside } from 'hooks'
import { Base, Dropdown, Place } from './styles'

const SEARCH_ENDPOINT = 'https://api.mapbox.com/geocoding/v5/mapbox.places'

const { MAPBOX_API_KEY } = process.env

function SearchLocation({ onPress, value }) {
  const { t } = useTranslation('search-location')
  const ref = useRef()
  const [searchTerm, setSearchTerm] = useState('')
  const [text, setText] = useState('')
  const [isOpen, setOpen] = useState(false)
  const [results, setResults] = useState([])

  useClickOutside(ref, () => setSearchTerm(''))

  const query = useDebounce(searchTerm, 300)

  useEffect(() => {
    setText(value)
  }, [value])

  const handleOnPress = place => {
    onPress(place)
    setSearchTerm('')
    setOpen(false)
  }

  const onChangeText = text => {
    setSearchTerm(text)
    setText(text)
  }

  async function fetchResult() {
    const data = await fetch(
      `${SEARCH_ENDPOINT}/${encodeURIComponent(
        query
      )}.json?types=country%2Cregion%2Cplace&autocomplete=true&language=en&limit=10&access_token=${MAPBOX_API_KEY}`
    )

    const result = await data.json()

    setResults(result.features)
  }

  useEffect(() => {
    if (query) {
      setOpen(true)
      fetchResult()
    } else {
      setOpen(false)
      setResults([])
    }
  }, [query])

  return (
    <Base>
      <Input
        placeholder={t('PLACEHOLDER')}
        value={text}
        onChangeText={onChangeText}
        autoComplete="disabelAutocompleteHack"
        type="search"
      />

      {isOpen && (
        <Dropdown ref={ref}>
          {results.length
            ? results.map(({ id, place_name }) => (
                <li onClick={() => handleOnPress(place_name)} key={id}>
                  <Place>{place_name}</Place>
                </li>
              ))
            : t('NO_RESULT')}
        </Dropdown>
      )}
    </Base>
  )
}

export default SearchLocation
