import React, { useEffect, useState } from 'react'
import { Dimensions, View, Image, ActivityIndicator } from 'react-native'
import * as MediaLibrary from 'react-native-media-library'
import { Text, Touchable } from 'ui'
import { COLORS } from 'ui/constants'
import { pathOr } from 'ramda'
import { logError } from 'utils/sentry'
const { height } = Dimensions.get('window')

const PADDING_TOP = 20
const HEIGHT = 100

function Albums({ onPress }) {
  const [albums, setAlbums] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getAlbums = async () => {
    try {
      const albums = await MediaLibrary.getAlbumsAsync({ includeSmartAlbums: true })

      const data = await Promise.all(
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
      )

      setAlbums(data.filter(a => a.totalCount > 0).sort((a, b) => b.assetCount - a.assetCount))
      setIsLoading(false)
    } catch (err) {
      logError(err)
    }
  }

  useEffect(() => {
    getAlbums()
  }, [])

  if (isLoading) {
    return (
      <View
        style={{
          backgroundColor: 'white',
          minHeight: height,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="small" color="black" />
      </View>
    )
  }

  return (
    <View
      style={{
        height: albums.length * HEIGHT + PADDING_TOP * 2,
        minHeight: height,
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: PADDING_TOP,
      }}
    >
      <View
        style={{
          width: 60,
          height: 5,
          backgroundColor: COLORS.LIGHT_GREY,
          borderRadius: 5,
          alignSelf: 'center',
          marginBottom: PADDING_TOP,
        }}
      />
      {albums.map(({ id, title, totalCount, preview }) => (
        <View key={id} style={{ height: HEIGHT, width: '100%' }}>
          <Touchable onPress={() => onPress({ id, title })} style={{ flexDirection: 'row' }}>
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
