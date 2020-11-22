import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { HEADER_HEIGHT } from './constants';

function Header({
  headerTitle,
  headerLeft,
  headerRight,
  selectedAlbum,
  headerLeftStyle = {},
  headerRightStyle = {},
  arrowStyle = {},
  toggleAlbum,
}) {
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
          <Animated.View style={[{ width: 70 }, headerLeftStyle]}>
            {headerLeft}
          </Animated.View>

          {headerTitle ? (
            <Text
              style={{
                color: 'white',
                margin: 8,
                fontWeight: '600',
                fontSize: 16,
              }}
            >
              {headerTitle}
            </Text>
          ) : (
            <TouchableOpacity
              onPress={toggleAlbum}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: 'white',
                  margin: 8,
                  fontWeight: '600',
                  fontSize: 16,
                }}
              >
                {selectedAlbum?.title}
              </Text>

              {/* <Animated.Image
                source={require('../../assets/chevronDown.png')}
                style={[{ tintColor: 'white' }, arrowStyle]}
              /> */}
            </TouchableOpacity>
          )}

          <Animated.View style={[{ width: 60 }, headerRightStyle]}>
            {headerRight}
          </Animated.View>
        </View>
      </View>
    </>
  );
}

export default Header;
