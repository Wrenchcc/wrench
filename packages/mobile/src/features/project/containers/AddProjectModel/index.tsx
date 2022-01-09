import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  useCurrentUserProjectsQuery,
  useAddProjectMutation,
  CurrentUserDocument,
} from '@wrench/common'
import { useNavigation, SCREENS } from 'navigation'
import { useReactiveVar, store, PROJECT } from 'gql'
import { ActivityIndicator, Header, Title, Text, Input, Icon, KeyboardAvoidingView } from 'ui'
import { arrowLeft } from 'images'
import SearchModel from 'features/project/components/SearchModel'
import { COLORS } from 'ui/constants'

function formatModel(model) {
  return `${model.brand.name} ${model.model} ${model.year}`
}

function AddProjectModel() {
  const { t } = useTranslation('add-project-model')
  const { navigate, navigateBack, dismissModal } = useNavigation()
  const [addProject] = useAddProjectMutation()
  const [query, setQuery] = useState()
  const [isSearching, setIsSearching] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const { data } = useCurrentUserProjectsQuery({
    fetchPolicy: 'cache-only',
  })

  const { model, type, title } = useReactiveVar(store.project.projectVar)

  const handleNavigationBack = useCallback(() => {
    navigateBack()
  }, [navigateBack])

  const onChangeText = useCallback(
    (value) => {
      setQuery(value)

      if (model) {
        store.project.update(PROJECT.MODEL, null)
      } else {
        if (!isSearching) {
          setIsSearching(true)
        }
      }
    },
    [setQuery, model]
  )

  const handleSave = useCallback(async () => {
    setIsSaving(true)

    await addProject({
      variables: {
        input: {
          modelId: model ? model.id : null,
          projectTypeId: type,
          title,
        },
      },
      update: (cache, { data: { addProject } }) => {
        try {
          const data = cache.readQuery({ query: CurrentUserDocument })

          cache.writeQuery({
            query: CurrentUserDocument,
            data: {
              ...data,
              user: {
                ...data.user,
                projects: {
                  ...data.user.projects,
                  edges: [
                    {
                      node: {
                        ...addProject,
                        files: {
                          edges: [],
                          __typename: 'FileConnection',
                        },
                        followers: {
                          totalCount: 0,
                          __typename: 'FollowersConnection',
                        },
                        __typename: 'Project',
                      },
                      __typename: 'ProjectEdge',
                    },
                    ...data.user.projects.edges,
                  ],
                },
              },
            },
          })

          store.project.setProjectId(addProject.id)
        } catch (err) {
          console.log(err)
        }
      },
    })

    if (data.user.projects.edges.length > 0) {
      dismissModal()
    } else {
      navigate(SCREENS.ADD_MEDIA, {
        options: {
          layout: {
            componentBackgroundColor: COLORS.DARK,
          },
        },
      })
    }

    store.project.reset()
  }, [dismissModal, model, type, title, data])

  const handleModelChange = useCallback(
    (selectedModel) => {
      setIsSearching(false)
      store.project.update(PROJECT.MODEL, selectedModel)
      setQuery(formatModel(selectedModel))
    },
    [setIsSearching, setQuery]
  )

  const handleOnBlur = useCallback(() => setIsSearching(false), [setIsSearching])

  return (
    <>
      <Header
        headerLeft={<Icon source={arrowLeft} onPress={handleNavigationBack} />}
        headerTitle={<Text medium>{t('headerTitle')}</Text>}
        headerRight={
          isSaving ? (
            <ActivityIndicator />
          ) : (
            <Text onPress={handleSave} medium>
              {model ? t('add') : t('skip')}
            </Text>
          )
        }
      />
      {isSearching && <SearchModel query={query} onPress={handleModelChange} />}

      <KeyboardAvoidingView keyboardVerticalOffset={20}>
        <Title large numberOfLines={0} style={{ marginBottom: 30 }}>
          {t('title')}
        </Title>

        <Input
          placeholder={t('placeholder')}
          large
          onChangeText={onChangeText}
          value={model ? formatModel(model) : query}
          borderColor="dark"
          color="dark"
          returnKeyType="next"
          onBlur={handleOnBlur}
          autoFocus
        />
      </KeyboardAvoidingView>
    </>
  )
}

export default AddProjectModel
