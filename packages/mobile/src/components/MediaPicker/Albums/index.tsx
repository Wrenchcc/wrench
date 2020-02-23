import React, { useEffect, useState } from 'react'
import { View, Image } from 'react-native'
import * as MediaLibrary from '@pontusab/react-native-media-library'
import { Text, Touchable } from 'ui'
import { pathOr } from 'rambda'
import { logError } from 'utils/sentry'
import { Base, Bar } from './styles'

const HEIGHT = 100

function Albums({ onPress }) {
  const [albums, setAlbums] = useState([])

  const getAlbums = async () => {
    try {
      const albums = await MediaLibrary.getAlbumsAsync({
        includeSmartAlbums: true,
      })

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
    } catch (err) {
      logError(err)
    }
  }

  useEffect(() => {
    getAlbums()
  }, [])

  return (
    <Base height={albums.length * HEIGHT}>
      <Bar />

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
    </Base>
  )
}

export default Albums
