import React, { useEffect, useState, useCallback } from 'react'
import { Dimensions, FlatList, ActivityIndicator } from 'react-native'
import { useTranslation } from 'react-i18next'
import { AppNavigation, useNavigation } from 'navigation'
import { omit } from 'ramda'
import { compose } from 'ramda'
import { track, events } from 'utils/analytics'
import { getProjectTypes } from 'graphql/queries/project/getProjectTypes'
import { editUser } from 'graphql/mutations/user/editUser'
import { Header, Touchable, Text, Loader, Icon } from 'ui'
import Content from 'features/signIn/components/Content'
import Footer from 'features/signIn/components/Footer'
import { arrowLeft } from 'images'
import { Base, Cell, Image, Overlay, Picture } from './styles'

const { width } = Dimensions.get('window')

const MIN_ITEMS = 3
const GUTTER = 10
const ITEM_SIZE = width / 2 - GUTTER

const keyExtractor = item => item.id

function Onboarding({ isFetching, types, editUser: editUserMutation, settingsPage }) {
  const { t } = useTranslation()
  const { navigateBack } = useNavigation()
  const [isSaving, setIsSaving] = useState(false)
  const [items, setItems] = useState({})

  useEffect(() => {
    track(events.USER_ONBOARDING_CATEGORIES_VIEWED)
  }, [])

  const handleNavigationBack = useCallback(() => {
    navigateBack()
  }, [navigateBack])

  const progress = () => (Object.keys(items).length / 3) * 100

  const isComplete = () => {
    if (Object.keys(items).length >= MIN_ITEMS) {
      track(events.USER_ONBOARDING_CATEGORIES_SELECTED)
      return true
    }

    return false
  }

  const toggleSelection = item => {
    if (items[item.id]) {
      setItems(omit([item.id]))
    } else {
      setItems({
        ...items,
        [item.id]: item,
      })
    }
  }

  const handleSubmit = () => {
    setIsSaving(true)
    track(events.USER_ONBOARDING_CATEGORIES_DONE)
    const interestedIn = Object.keys(items).map(id => ({ id }))

    editUserMutation({ interestedIn }).then(
      setTimeout(settingsPage ? navigateBack : AppNavigation, 300)
    )
  }

  const renderItem = ({ item }) => (
    <Cell key={item.id}>
      <Touchable onPress={() => toggleSelection(item)}>
        <Picture width={ITEM_SIZE} height={ITEM_SIZE}>
          <Image
            selected={items[item.id]}
            placeholderColor="transparent"
            source={{ uri: item.imageUrl }}
            gutter={GUTTER}
            width={ITEM_SIZE}
            height={ITEM_SIZE}
            black={settingsPage}
          >
            <Overlay selected={false} />
            <Text color="white">{item.title}</Text>
          </Image>
        </Picture>
      </Touchable>
    </Cell>
  )

  const renderHeaderRight = () =>
    isSaving ? (
      <ActivityIndicator size="small" color={settingsPage ? 'black' : 'white'} />
    ) : (
      <Text
        color={settingsPage ? 'dark' : 'white'}
        medium
        opacity={isComplete() ? 1 : 0.5}
        disabled={!isComplete()}
        onPress={handleSubmit}
      >
        {settingsPage ? t('Onboarding:save') : t('Onboarding:next')}
      </Text>
    )

  const renderHeaderLeft = () =>
    settingsPage && <Icon source={arrowLeft} onPress={handleNavigationBack} />

  return (
    <Base settingsPage={settingsPage}>
      <Header
        headerLeft={renderHeaderLeft()}
        headerTitle={
          settingsPage && (
            <Text numberOfLines={1} medium>
              {t('Onboarding:headerTitle')}
            </Text>
          )
        }
        headerRight={renderHeaderRight()}
        color={settingsPage ? 'white' : 'black'}
      />
      <FlatList
        ListHeaderComponent={!settingsPage && <Content />}
        ListEmptyComponent={isFetching && <Loader color="grey" />}
        contentContainerStyle={{ padding: 5, flex: isFetching ? 1 : 0 }}
        numColumns={2}
        data={types}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
      {!settingsPage && <Footer progress={progress()} />}
    </Base>
  )
}

export default compose(
  getProjectTypes,
  editUser
)(Onboarding)
