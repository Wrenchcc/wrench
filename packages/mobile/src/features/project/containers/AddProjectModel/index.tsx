import React, { useCallback, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useCurrentUserProjectsQuery } from '@wrench/common'
import { addProject } from 'services/graphql/mutations/project/addProject'
import { useNavigation, SCREENS } from 'navigation'
import { useProjectStore, PROJECT } from 'store'
import { Header, Title, Text, Input, KeyboardAvoidingView, Icon } from 'ui'
import { arrowLeft } from 'images'
import SearchModel from 'features/project/components/SearchModel'
import { COLORS } from 'ui/constants'
import { isIphone } from 'utils/platform'

function formatModel(model) {
  return `${model.brand.name} ${model.model} ${model.year}`
}

function AddProjectModel({ addProject: addProjectMutation }) {
  const { t } = useTranslation()
  const { navigate, navigateBack, dismissModal } = useNavigation()
  const [query, setQuery] = useState()
  const [isSearching, setIsSearching] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const { data } = useCurrentUserProjectsQuery({
    fetchPolicy: 'cache-only',
  })

  const { update, reset, model, type, title } = useProjectStore(store => ({
    model: store.model,
    reset: store.actions.reset,
    title: store.title,
    type: store.type,
    update: store.actions.update,
  }))

  const handleNavigationBack = useCallback(() => {
    navigateBack()
  }, [navigateBack])

  const onChangeText = useCallback(
    value => {
      setQuery(value)

      if (model) {
        update(PROJECT.MODEL, null)
      } else {
        if (!isSearching) {
          setIsSearching(true)
        }
      }
    },
    [setQuery, update, model]
  )

  const handleSave = useCallback(async () => {
    setIsSaving(true)

    await addProjectMutation({
      modelId: model ? model.id : null,
      projectTypeId: type,
      title,
    })

    if (data.user.projects.edges.length > 0) {
      dismissModal()
    } else {
      navigate(SCREENS.ADD_MEDIA, {
        options: {
          layout: {
            backgroundColor: COLORS.DARK,
          },
          statusBar: {
            backgroundColor: 'black',
            style: 'light',
            visible: isIphone ? false : true,
          },
        },
      })
    }
    reset()
  }, [reset, dismissModal, model, type, title, data])

  const handleModelChange = useCallback(
    selectedModel => {
      setIsSearching(false)
      update(PROJECT.MODEL, selectedModel)
      setQuery(formatModel(selectedModel))
    },
    [update, setIsSearching, setQuery]
  )

  const handleOnBlur = useCallback(() => setIsSearching(false), [setIsSearching])

  return (
    <>
      <Header
        headerLeft={<Icon source={arrowLeft} onPress={handleNavigationBack} />}
        headerTitle={<Text medium>{t('AddProjectModel:headerTitle')}</Text>}
        headerRight={
          isSaving ? (
            <ActivityIndicator size="small" color="black" />
          ) : (
            <Text onPress={handleSave} medium>
              {model ? t('AddProjectModel:add') : t('AddProjectModel:skip')}
            </Text>
          )
        }
      />
      <KeyboardAvoidingView>
        {isSearching && <SearchModel query={query} onPress={handleModelChange} />}

        <Title large numberOfLines={0} style={{ marginBottom: 80 }}>
          {t('AddProjectModel:title')}
        </Title>

        <Input
          placeholder={t('AddProjectModel:placeholder')}
          autoFocus
          large
          onChangeText={onChangeText}
          value={model ? formatModel(model) : query}
          borderColor="dark"
          color="dark"
          returnKeyType="next"
          onBlur={handleOnBlur}
        />
      </KeyboardAvoidingView>
    </>
  )
}

export default addProject(AddProjectModel)
