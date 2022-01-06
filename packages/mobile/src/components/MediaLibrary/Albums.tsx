import React, { useEffect, useState, useCallback } from 'react'
import { View, Image, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import * as MediaLibrary from 'expo-media-library'
import { BlurView } from 'expo-blur'
import { store } from 'gql'
import { ALBUM_INNER_HEIGHT, ALBUM_WIDTH, HEADER_HEIGHT } from './constants'

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgba(000, 000, 000, .8)',
  },
  background: {
    top: HEADER_HEIGHT,
    width: ALBUM_WIDTH,
    zIndex: 10000,
    height: ALBUM_INNER_HEIGHT,
  },
  scrollview: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#222',
  },
  content: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  item: {
    height: 100,
    width: '100%',
  },
  image: {
    width: 80,
    height: 80,
    backgroundColor: '#222',
  },
  inner: {
    paddingLeft: 10,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 5,
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  count: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
}

function Albums({ translateY, onPress, onPermission }) {
  const [albums, setAlbums] = useState([])

  const getAlbums = useCallback(async () => {
    try {
      const albums = await MediaLibrary.getAlbumsAsync({
        includeSmartAlbums: true,
      })

      const data = await Promise.all(
        albums.map(async (album) => {
          const result = await MediaLibrary.getAssetsAsync({
            album: album.id,
            first: 1,
            sortBy: [[MediaLibrary.SortBy.creationTime, false]],
          })

          return {
            ...album,
            preview: result?.assets[0],
            totalCount: result.totalCount,
          }
        })
      )

      const result = data
        .filter((a) => a.totalCount > 0)
        .sort((a, b) => b.assetCount - a.assetCount)

      store.files.setAlbumTitle(result[0]?.title)
      setAlbums(result)
    } catch {
      onPermission()
    }
  }, [])

  useEffect(() => {
    getAlbums()
  }, [])

  const handleOnPress = useCallback((album) => {
    store.files.setAlbum(album)
    onPress()
  }, [])

  const albumStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    }
  })

  return (
    <AnimatedBlurView
      intensity={100}
      tint="dark"
      style={[StyleSheet.absoluteFill, styles.background, albumStyle]}
    >
      <View style={styles.container}>
        <ScrollView style={styles.scrollview} contentContainerStyle={styles.content}>
          {albums.map(({ id, title, totalCount, preview }) => (
            <View key={id} style={styles.item}>
              <TouchableOpacity
                onPress={() => handleOnPress({ id, title })}
                style={{ flexDirection: 'row' }}
              >
                <Image fadeDuration={0} source={preview} style={styles.image} />
                <View style={styles.inner}>
                  <Text style={styles.title}>{title}</Text>
                  <Text style={styles.count}>{totalCount}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </AnimatedBlurView>
  )
}

export default React.memo(Albums)
