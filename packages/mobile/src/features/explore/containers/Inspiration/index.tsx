import React, { useCallback } from 'react'
import { FlatList, View } from 'react-native'
import { useNavigation } from 'navigation'
import { Icon, Image } from 'ui'
import { arrowLeft } from 'images'
import { NAVIGATION } from 'navigation/constants'
import { BackButton, Item } from './styles'

const edges = new Array(10).fill({
  postId: 1,
  uri:
    'https://edge-files.wrench.cc/images/5fb9ca43-8a5b-43f1-ae68-3b15295ec6b2.jpg?w=640&h=640&webp=1',
  id: 1,
})

// const edges = [
//   {
//     postId: 1,
//     uri:
//       'https://edge-files.wrench.cc/images/5fb9ca43-8a5b-43f1-ae68-3b15295ec6b2.jpg?w=640&h=640&webp=1',
//     id: 1,
//   },
//   {
//     postId: 1,
//     uri:
//       'https://edge-files.wrench.cc/images/5fb9ca43-8a5b-43f1-ae68-3b15295ec6b2.jpg?w=640&h=640&webp=1',
//     id: 1,
//   },
//   {
//     postId: 1,
//     uri:
//       'https://edge-files.wrench.cc/images/5fb9ca43-8a5b-43f1-ae68-3b15295ec6b2.jpg?w=640&h=640&webp=1',
//     id: 1,
//   },
//   {
//     postId: 1,
//     uri:
//       'https://edge-files.wrench.cc/images/5fb9ca43-8a5b-43f1-ae68-3b15295ec6b2.jpg?w=640&h=640&webp=1',
//     id: 1,
//   },
//   {
//     postId: 1,
//     uri:
//       'https://edge-files.wrench.cc/images/5fb9ca43-8a5b-43f1-ae68-3b15295ec6b2.jpg?w=640&h=640&webp=1',
//     id: 1,
//   },
//   {
//     postId: 1,
//     uri:
//       'https://edge-files.wrench.cc/images/5fb9ca43-8a5b-43f1-ae68-3b15295ec6b2.jpg?w=640&h=640&webp=1',
//     id: 1,
//   },
//   {
//     postId: 1,
//     uri:
//       'https://edge-files.wrench.cc/images/5fb9ca43-8a5b-43f1-ae68-3b15295ec6b2.jpg?w=640&h=640&webp=1',
//     id: 1,
//   },
//   {
//     postId: 1,
//     uri:
//       'https://edge-files.wrench.cc/images/5fb9ca43-8a5b-43f1-ae68-3b15295ec6b2.jpg?w=640&h=640&webp=1',
//     id: 1,
//   },
//   {
//     postId: 1,
//     uri:
//       'https://edge-files.wrench.cc/images/5fb9ca43-8a5b-43f1-ae68-3b15295ec6b2.jpg?w=640&h=640&webp=1',
//     id: 1,
//   },
//   {
//     postId: 1,
//     uri:
//       'https://edge-files.wrench.cc/images/5fb9ca43-8a5b-43f1-ae68-3b15295ec6b2.jpg?w=640&h=640&webp=1',
//     id: 1,
//   },
//   {
//     postId: 1,
//     uri:
//       'https://edge-files.wrench.cc/images/5fb9ca43-8a5b-43f1-ae68-3b15295ec6b2.jpg?w=640&h=640&webp=1',
//     id: 1,
//   },
//   {
//     postId: 1,
//     uri:
//       'https://edge-files.wrench.cc/images/5fb9ca43-8a5b-43f1-ae68-3b15295ec6b2.jpg?w=640&h=640&webp=1',
//     id: 1,
//   },
//   {
//     postId: 1,
//     uri:
//       'https://edge-files.wrench.cc/images/5fb9ca43-8a5b-43f1-ae68-3b15295ec6b2.jpg?w=640&h=640&webp=1',
//     id: 1,
//   },
// ]

function Inspiration() {
  const { navigateBack } = useNavigation()

  const handleNavigationBack = useCallback(() => {
    navigateBack()
  }, [navigateBack])

  const renderItem = ({ item, index }) => {
    if (index % 3 === 0) {
      return (
        <>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
              marginBottom: 5,
            }}
          >
            <View
              style={{
                backgroundColor: 'red',
                width: 100,
                height: 100,
              }}
            />
            <View style={{ backgroundColor: 'red', width: 100, height: 100 }} />
            <View style={{ backgroundColor: 'red', width: 100, height: 100 }} />
            <View style={{ backgroundColor: 'red', width: 100, height: 100 }} />
          </View>

          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
            <View
              style={{
                backgroundColor: 'red',
                width: 100,
                height: 100,
              }}
            />
            <View style={{ backgroundColor: 'red', width: 100, height: 100 }} />
            <View style={{ backgroundColor: 'red', width: 100, height: 100 }} />
            <View style={{ backgroundColor: 'red', width: 100, height: 100 }} />
          </View>
        </>
      )
    }

    return (
      <View
        style={{
          flex: 1,
          marginTop: 5,
          marginBottom: 5,
          backgroundColor: 'blue',
          width: 415,
          height: 415,
        }}
      />
    )

    // return (
    //   <Item>
    //     <Image source={item.uri} width={100} height={100} />
    //   </Item>
    // )
  }

  return (
    <>
      <BackButton onPress={handleNavigationBack}>
        <Icon source={arrowLeft} onPress={handleNavigationBack} />
      </BackButton>

      <FlatList
        data={edges}
        renderItem={renderItem}
        contentInset={{ top: -NAVIGATION.STATUS_BAR_HEIGHT }}
      />
    </>
  )
}

export default Inspiration
