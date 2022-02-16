import React, { useEffect, useState } from 'react'
import { Dimensions, View } from 'react-native'
import { useEditUserMutation } from '@wrench/common'
import FastImage from 'react-native-fast-image'
import { useTranslation } from 'react-i18next'
import { useCurrentUserQuery, useProjectTypesQuery } from '@wrench/common'
import { Page, FlatList, useNavigation, SCREENS, keyExtractor } from 'navigation'
import { omit } from 'rambda'
import { track, events } from 'utils/analytics'
import { ActivityIndicator, Touchable, Text } from 'ui'
import Content from 'features/signIn/components/Content'
import Skeleton from './Skeleton'
import PlatformColor from 'ui/PlatformColor'

const { width } = Dimensions.get('window')

const GUTTER = 10
const MIN_ITEMS = 3

export const ITEM_SIZE = width / 2 - GUTTER

const styles = {
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: 'transparent',
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    margin: GUTTER / 2,
    width: ITEM_SIZE - GUTTER / 2,
    height: ITEM_SIZE - GUTTER / 2,
  },
  cell: {
    width: '50%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: -3,
    bottom: -3,
    left: 0,
  },
}

function Onboarding({ settingsPage }) {
  const { t } = useTranslation('onboarding')
  const { navigate, navigateBack } = useNavigation()
  const [isSaving, setIsSaving] = useState(false)
  const [items, setItems] = useState({})

  const [editUser] = useEditUserMutation()

  const { data: projectData, loading } = useProjectTypesQuery()

  const { data: userData } = useCurrentUserQuery()

  useEffect(() => {
    track(events.USER_ONBOARDING_CATEGORIES_VIEWED)
  }, [])

  useEffect(() => {
    if (userData?.user?.interestedIn) {
      const items = userData.user.interestedIn.reduce((o, val) => {
        o[val.id] = val
        return o
      }, {})

      setItems(items)
    }
  }, [userData])

  const isComplete = () => {
    if (Object.keys(items).length >= MIN_ITEMS) {
      track(events.USER_ONBOARDING_CATEGORIES_SELECTED)
      return true
    }

    return false
  }

  const toggleSelection = (item) => {
    if (items[item.id]) {
      setItems(omit([item.id]))
    } else {
      setItems({
        ...items,
        [item.id]: item,
      })
    }
  }

  const handleSubmit = async () => {
    setIsSaving(true)
    track(events.USER_ONBOARDING_CATEGORIES_DONE)
    const interestedIn = Object.keys(items).map((id) => ({ id }))

    await editUser({
      variables: {
        input: {
          interestedIn,
        },
      },
    })

    requestAnimationFrame(
      settingsPage
        ? () => {
            navigateBack()
            setIsSaving(false)
          }
        : () => {
            navigate(SCREENS.PROJECT_SUGGESTIONS)
            setIsSaving(false)
          }
    )
  }

  const renderItem = ({ item }) => (
    <View key={item.id} style={styles.cell}>
      <Touchable onPress={() => toggleSelection(item)}>
        <FastImage
          source={{ uri: item.imageUrl }}
          style={[
            styles.image,
            {
              borderColor: items[item.id] ? PlatformColor.inverse : PlatformColor.default,
            },
          ]}
        >
          <View
            style={[
              styles.overlay,
              {
                backgroundColor: items[item.id]
                  ? 'rgba(000, 000, 000, 0.5)'
                  : 'rgba(000, 000, 000, 0.2)',
              },
            ]}
          />
          <Text color="white">{item.title}</Text>
        </FastImage>
      </Touchable>
    </View>
  )

  const headerRight = isSaving ? (
    <ActivityIndicator />
  ) : (
    <Text
      color="inverse"
      medium
      opacity={isComplete() ? 1 : 0.5}
      disabled={!isComplete()}
      onPress={handleSubmit}
    >
      {settingsPage ? t('save') : t('next')}
    </Text>
  )

  const headerTitle = settingsPage && t('headerTitle')

  const ListHeaderComponent = !settingsPage && <Content />
  const ListEmptyComponent = loading && <Skeleton />

  return (
    <Page
      disableAnimation
      {...(!settingsPage && { headerLeft: true })}
      headerTitle={headerTitle}
      headerRight={headerRight}
    >
      <FlatList
        paddingHorizontal={10}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        numColumns={2}
        data={projectData?.types}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </Page>
  )
}

export default Onboarding
