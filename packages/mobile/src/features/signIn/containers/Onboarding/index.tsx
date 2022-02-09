import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import { useEditUserMutation } from '@wrench/common'
import { useTranslation } from 'react-i18next'
import { useCurrentUserQuery, useProjectTypesQuery } from '@wrench/common'
import { Page, FlatList, useNavigation, SCREENS, keyExtractor } from 'navigation'
import { omit } from 'rambda'
import { track, events } from 'utils/analytics'
import { ActivityIndicator, Touchable, Text, Loader } from 'ui'
import Content from 'features/signIn/components/Content'
import Footer from 'features/signIn/components/Footer'
import { Cell, Image, Overlay, Picture } from './styles'

const { width } = Dimensions.get('window')

const MIN_ITEMS = 3
const GUTTER = 10
const ITEM_SIZE = width / 2 - GUTTER

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

  const progress = () => (Object.keys(items).length / 3) * 100

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
      disableAnimation
      {...(!settingsPage && { headerLeft: true })}
      headerTitle={settingsPage && t('headerTitle')}
      headerRight={
        isSaving ? (
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
      }
    >
      <FlatList
        paddingHorizontal={10}
        ListHeaderComponent={!settingsPage && <Content />}
        ListEmptyComponent={loading && <Loader />}
        contentContainerStyle={{ flex: loading ? 1 : 0 }}
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
