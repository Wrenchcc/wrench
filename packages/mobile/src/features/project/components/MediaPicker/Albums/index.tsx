import React, { useState, useEffect } from 'react'
import { Dimensions, View, Image } from 'react-native'
import { useTranslation } from 'react-i18next'
import * as MediaLibrary from 'expo-media-library'
import { logError } from 'utils/sentry'
import { Text, Touchable } from 'ui'
import { COLORS } from 'ui/constants'
import { pathOr, prepend } from 'ramda'

const { height } = Dimensions.get('window')

const PADDING_TOP = 20
const HEIGHT = 100

function Albums({ onPress }) {
  const { t } = useTranslation()
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)

  async function fetchAlbums() {
    try {
      const first = {
        id: null,
        title: t('Albums:cameraroll'),
      }

      const results = await MediaLibrary.getAlbumsAsync()
      const albums = prepend(first, results)

      const assets = await Promise.all(
        albums.map(async album => {
          const result = await MediaLibrary.getAssetsAsync({
            album: album.id,
            first: 1,
          })

          return {
            ...album,
            preview: pathOr(null, ['assets', 0], result),
            totalCount: result.totalCount,
          }
        })
      ).catch(err => {
        logError(err)
      })

      setData(assets.filter(a => a.totalCount > 0).sort((a, b) => a - b))
      setLoading(false)
    } catch (err) {
      logError(err)
    }
  }

  useEffect(() => {
    fetchAlbums()
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <View
      style={{
        backgroundColor: 'white',
        height: data.length * HEIGHT + PADDING_TOP * 2,
        minHeight: height,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: PADDING_TOP,
      }}
    >
      <View
        style={{
          alignSelf: 'center',
          backgroundColor: COLORS.LIGHT_GREY,
          borderRadius: 5,
          height: 5,
          marginBottom: PADDING_TOP,
          width: 60,
        }}
      />
      {data.map(({ id, title, totalCount, preview }) => (
        <View key={id} style={{ height: HEIGHT, width: '100%' }}>
          <Touchable onPress={() => onPress(id)} style={{ flexDirection: 'row' }}>
            <Image source={preview} style={{ width: 80, height: 80 }} />
            <View style={{ paddingLeft: 10, justifyContent: 'center' }}>
              <Text style={{ marginBottom: 5 }}>{title}</Text>
              <Text fontSize={14} color="grey">
                {totalCount}
              </Text>
            </View>
          </Touchable>
        </View>
      ))}
    </View>
  )
}

export default Albums
