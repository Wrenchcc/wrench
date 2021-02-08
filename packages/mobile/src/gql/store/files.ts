import { makeVar } from '@apollo/client'
import * as MediaLibrary from 'expo-media-library'
import { assocPath } from 'rambda'
import { logError } from 'utils/sentry'
import { MAX_SELECTED_FILES } from './constants'

export const croppedFilesVar = makeVar([])
export const selectedFilesVar = makeVar([])
export const selectedFileIdVar = makeVar('')

export const add = (payload) => croppedFilesVar(payload)
export const deselectAll = () => selectedFilesVar([])

export const reset = () => {
  croppedFilesVar([])
  selectedFilesVar([])
  selectedFileIdVar('')
}

export const select = async (payload) => {
  const currentId = payload.id
  const selectedFiles = selectedFilesVar()
  const isAdded = selectedFiles.some((file) => file.id === currentId)
  const isPrevious = selectedFileIdVar() === currentId
  const currentIndex = selectedFiles.findIndex((e) => e.id === currentId)

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
  const currentIndex = selectedFiles.findIndex((e) => e.id === selectedId)

  selectedFilesVar(assocPath([currentIndex, 'crop'], payload, selectedFiles))
}
