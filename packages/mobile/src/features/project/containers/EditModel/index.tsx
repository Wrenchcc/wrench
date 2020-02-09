import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { useEditProjectMutation } from '@wrench/common'
import { useTranslation } from 'react-i18next'
import { useNavigation } from 'navigation'
import { Header, Title, Text, Input, Icon, KeyboardAvoidingView } from 'ui'
import { arrowLeft } from 'images'
import SearchModel from 'features/project/components/SearchModel'

function formatModel(model) {
  return `${model.brand.name} ${model.model} ${model.year}`
}

function EditModel({ passProps }) {
  const { t } = useTranslation()
  const { navigateBack } = useNavigation()
  const [query, setQuery] = useState('')
  const [model, setModel] = useState()
  const [isSearching, setIsSearching] = useState(false)

  const [editProject] = useEditProjectMutation()

  const handleNavigationBack = useCallback(() => {
    navigateBack()
  }, [navigateBack])

  const onChangeText = useCallback(
    value => {
      setQuery(value)

      if (model) {
        setModel(null)
      } else {
        if (!isSearching) {
          setIsSearching(true)
        }
      }
    },
    [setQuery, setModel, model]
  )

  const handleSave = useCallback(() => {
    editProject({
      variables: {
        id: passProps.id,
        input: {
          modelId: model.id,
        },
      },
    })
    navigateBack()
  }, [navigateBack, model, passProps])

  const handleModelChange = useCallback(
    selectedModel => {
      setIsSearching(false)
      setModel(selectedModel)
      setQuery(formatModel(selectedModel))
    },
    [setModel, setIsSearching, setQuery]
  )

  const handleOnBlur = useCallback(() => setIsSearching(false), [setIsSearching])

  return (
    <>
      <Header
        headerLeft={<Icon source={arrowLeft} onPress={handleNavigationBack} />}
        headerTitle={<Text medium>{t('AddProjectModel:headerTitle')}</Text>}
        headerRight={
          model && (
            <Text onPress={handleSave} medium>
              {t('EditModel:save')}
            </Text>
          )
        }
      />
      {isSearching && <SearchModel query={query} onPress={handleModelChange} />}

      <KeyboardAvoidingView>
        <Title large numberOfLines={0} style={{ marginBottom: 80 }}>
          {t('AddProjectModel:title')}
        </Title>

        <Input
          placeholder={t('AddProjectModel:placeholder')}
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

  return (
    <>
      <Header
        headerLeft={<Icon source={arrowLeft} onPress={handleNavigationBack} />}
        headerTitle={<Text medium>{t('EditModel:headerTitle')}</Text>}
        headerRight={
          model && (
            <Text onPress={handleSave} medium>
              {t('EditModel:save')}
            </Text>
          )
        }
      />
      <View style={{ flex: 1 }}>
        {isSearching && <SearchModel query={query} onPress={handleModelChange} />}

        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <View style={{ flex: 1, paddingHorizontal: 20 }}>
            <Title large numberOfLines={0} style={{ marginBottom: 80 }}>
              {t('AddProjectModel:title')}
            </Title>

            <Input
              placeholder={t('AddProjectModel:placeholder')}
              large
              onChangeText={onChangeText}
              value={model ? formatModel(model) : query}
              borderColor="dark"
              color="dark"
              returnKeyType="next"
              onBlur={handleOnBlur}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  )
}

export default EditModel
