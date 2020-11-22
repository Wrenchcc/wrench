import React, { useEffect, useState } from 'react'
import { View, Image, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import * as MediaLibrary from 'expo-media-library'
import { BlurView } from 'expo-blur'
import { ALBUM_INNER_HEIGHT, ALBUM_WIDTH, HEADER_HEIGHT } from './constants'

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

function Albums({ onPress, setInitialAlbum, translateY }) {
  const [albums, setAlbums] = useState([])

  const getAlbums = async () => {
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

      setInitialAlbum(result[0])

      setAlbums(result)
    } catch (err) {}
  }

  useEffect(() => {
    getAlbums()
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
      style={[
        StyleSheet.absoluteFill,
        {
          top: HEADER_HEIGHT,
          width: ALBUM_WIDTH,
          zIndex: 10000,
          height: ALBUM_INNER_HEIGHT,
        },
        albumStyle,
      ]}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(000, 000, 000, .8)' }}>
        <ScrollView
          style={{
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: '#222',
          }}
          contentContainerStyle={{
            paddingTop: 10,
            paddingHorizontal: 10,
          }}
        >
          {albums.map(({ id, title, totalCount, preview }) => (
            <View key={id} style={{ height: 100, width: '100%' }}>
              <TouchableOpacity
                onPress={() => onPress({ id, title })}
                style={{ flexDirection: 'row' }}
              >
                <Image
                  source={preview}
                  style={{ width: 80, height: 80, backgroundColor: '#222' }}
                />
                <View style={{ paddingLeft: 10, justifyContent: 'center' }}>
                  <Text
                    style={{
                      marginBottom: 5,
                      color: 'white',
                      fontWeight: '500',
                      fontSize: 16,
                    }}
                  >
                    {title}
                  </Text>
                  <Text style={{ color: 'white', fontWeight: '500', fontSize: 14 }}>
                    {totalCount}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </AnimatedBlurView>
  )
}

export default Albums
