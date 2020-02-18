import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, ActivityIndicator } from 'react-native'
import { useEditUserMutation } from '@wrench/common'
import { useTranslation } from 'react-i18next'
import { useCurrentUserQuery, useProjectTypesQuery } from '@wrench/common'
import { Page, AppNavigation, useNavigation, SCREENS, keyExtractor } from 'navigation'
import { NAVIGATION_COMPONENTS } from 'navigation/constants'
import { omit } from 'rambda'
import { track, events } from 'utils/analytics'
import { Touchable, Text, Loader } from 'ui'
import Content from 'features/signIn/components/Content'
import Footer from 'features/signIn/components/Footer'
import { Cell, Image, Overlay, Picture } from './styles'

const { width } = Dimensions.get('window')

const MIN_ITEMS = 3
const GUTTER = 10
const ITEM_SIZE = width / 2 - GUTTER

function Onboarding({ settingsPage }) {
  const { t } = useTranslation()
  const { navigateBack, showModal } = useNavigation()
  const [isSaving, setIsSaving] = useState(false)
  const [items, setItems] = useState({})

  const [editUser] = useEditUserMutation()

  useEffect(() => {
    track(events.USER_ONBOARDING_CATEGORIES_VIEWED)
  }, [])

  const { data: projectData, loading } = useProjectTypesQuery()

  const { data: userData } = useCurrentUserQuery()

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

  const handleSubmit = async () => {
    setIsSaving(true)
    track(events.USER_ONBOARDING_CATEGORIES_DONE)
    const interestedIn = Object.keys(items).map(id => ({ id }))

    const Navigate = userData.user.isSilhouette
      ? () =>
          showModal(SCREENS.EDIT_PROFILE, {
            onboarding: true,
          })
      : () => AppNavigation(false)

    await editUser({
      variables: {
        input: {
          interestedIn,
        },
      },
    })
    setTimeout(settingsPage ? navigateBack : Navigate, 200)
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
          >
            <Overlay selected={false} />
            <Text color="white">{item.title}</Text>
          </Image>
        </Picture>
      </Touchable>
    </Cell>
  )

  return (
    <Page
      view
      headerAnimation={false}
      {...(!settingsPage && { headerLeft: [] })}
      headerTitle={settingsPage && t('Onboarding:headerTitle')}
      headerRight={{
        component: {
          name: NAVIGATION_COMPONENTS.CUSTOM_BUTTON,
          passProps: {
            children: isSaving ? (
              <ActivityIndicator size="small" color="black" />
            ) : (
              <Text
                color="dark"
                medium
                opacity={isComplete() ? 1 : 0.5}
                disabled={!isComplete()}
                onPress={handleSubmit}
              >
                {settingsPage ? t('Onboarding:save') : t('Onboarding:next')}
              </Text>
            ),
          },
        },
      }}
    >
      <FlatList
        ListHeaderComponent={!settingsPage && <Content />}
        ListEmptyComponent={loading && <Loader color="grey" />}
        contentContainerStyle={{ padding: 5, flex: loading ? 1 : 0 }}
        numColumns={2}
        data={projectData?.types}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
      {!settingsPage && <Footer progress={progress()} />}
    </Page>
  )
}

export default Onboarding
