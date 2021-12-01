import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import Text from 'ui/Text'
import Animated from 'react-native-reanimated'
import { HEADER_HEIGHT } from './constants'
import { arrowDown } from 'images'
import { useReactiveVar } from '@apollo/client'
import { store } from 'gql'

function Header({
  headerTitle,
  headerLeft,
  headerRight,
  headerLeftStyle = {},
  headerRightStyle = {},
  arrowStyle = {},
  toggleAlbum,
}) {
  const selectedAlbum = useReactiveVar(store.files.selectedAlbumVar)

  return (
    <>
      <View
        style={{
          width: '100%',
          backgroundColor: 'black',
          height: HEADER_HEIGHT,
        }}
      >
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 30,
            paddingHorizontal: 20,
            flex: 1,
          }}
        >
          <Animated.View style={[{ flex: 1, alignItems: 'flex-start' }, headerLeftStyle]}>
            {headerLeft}
          </Animated.View>

          <View
            style={{
              flex: 2,
              alignItems: 'center',
            }}
          >
            {headerTitle ? (
              <Text medium>{headerTitle}</Text>
            ) : (
              selectedAlbum && (
                <TouchableOpacity
                  onPress={toggleAlbum}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text medium>{selectedAlbum?.title}</Text>
                  <Animated.Image
                    source={arrowDown}
                    style={[{ tintColor: 'white', marginLeft: 5 }, arrowStyle]}
                  />
                </TouchableOpacity>
              )
            )}
          </View>

          <Animated.View style={[{ flex: 1, alignItems: 'flex-end' }, headerRightStyle]}>
            {headerRight}
          </Animated.View>
        </View>
      </View>
    </>
  )
}

export default Header
