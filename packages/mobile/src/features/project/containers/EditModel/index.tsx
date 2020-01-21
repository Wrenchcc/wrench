import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from 'navigation'
import { Header, Title, Text, Input, KeyboardAvoidingView, Icon } from 'ui'
import { arrowLeft } from 'images'
import SearchModel from 'features/project/components/SearchModel'

function formatModel(model) {
  return `${model.brand.name} ${model.model} ${model.year}`
}

function EditModel({ passProps }) {
  const editProjectMutation = () => {}
  const { t } = useTranslation()
  const { navigateBack } = useNavigation()
  const [query, setQuery] = useState('')
  const [model, setModel] = useState()
  const [isSearching, setIsSearching] = useState(false)

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
    editProjectMutation(passProps.id, { modelId: model.id })
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
        headerTitle={<Text medium>{t('EditModel:headerTitle')}</Text>}
        headerRight={
          model && (
            <Text onPress={handleSave} medium>
              {t('EditModel:save')}
            </Text>
          )
        }
      />
      <KeyboardAvoidingView>
        {isSearching && <SearchModel query={query} onPress={handleModelChange} />}

        <Title large numberOfLines={0} style={{ marginBottom: 80 }}>
          {t('EditModel:title')}
        </Title>

        <Input
          placeholder={t('EditModel:placeholder')}
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

export default EditModel
