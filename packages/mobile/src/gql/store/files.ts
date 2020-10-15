import { makeVar } from '@apollo/client'
import * as MediaLibrary from 'expo-media-library'
import { findIndex, propEq, assocPath } from 'rambda'
import { logError } from 'utils/sentry'
import { MAX_SELECTED_FILES } from './constants'

export const selectedFilesVar = makeVar([])
export const selectedFileIdVar = makeVar('')

export const add = (payload) => selectedFilesVar(payload)
export const deselectAll = () => selectedFilesVar([])

export const reset = () => {
  selectedFilesVar([])
  selectedFileIdVar('')
}

export const select = async (payload) => {
  const currentId = payload.id
  const selectedFiles = selectedFilesVar()
  const isAdded = selectedFiles.some((file) => file.id === currentId)
  const isPrevious = selectedFileIdVar() === currentId
  const currentIndex = findIndex(propEq('id', currentId))(selectedFiles)

  // If camera
  if (payload.camera && !selectedFiles.length) {
    // Save file
    try {
      const file = await MediaLibrary.createAssetAsync(payload.uri)

      selectedFileIdVar(file.id)
      selectedFilesVar([{ ...file, camera: true }])

      return
    } catch (err) {
      logError(err)
    }
  }

  if (!isPrevious && !isAdded && selectedFiles.length === MAX_SELECTED_FILES) {
    return
  }

  if (!isPrevious && isAdded) {
    selectedFileIdVar(currentId)
    selectedFilesVar(selectedFiles)
    return
  }

  const updatedFiles =
    isPrevious && isAdded
      ? selectedFiles.filter((file) => file.id !== currentId)
      : selectedFiles.concat(payload)

  const selectedId = isPrevious
    ? updatedFiles.length &&
      updatedFiles[currentIndex > 0 ? currentIndex - 1 : updatedFiles.length - 1 || 0].id
    : payload.id

  selectedFileIdVar(selectedId)
  selectedFilesVar(updatedFiles)
}

export const edit = (payload) => {
  const selectedFiles = selectedFilesVar()
  const selectedId = selectedFileIdVar()
  const currentIndex = findIndex(propEq('id', selectedId))(selectedFiles)

  selectedFilesVar(assocPath([currentIndex, 'crop'], payload, selectedFiles))
}
