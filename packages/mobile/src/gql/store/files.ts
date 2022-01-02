import { makeVar } from '@apollo/client'
import { assocPath } from 'rambda'
import { MAX_SELECTED_FILES } from './constants'

export const croppedFilesVar = makeVar([])
export const selectedFilesVar = makeVar([])
export const selectedFileIdVar = makeVar('')
export const selectedAlbumVar = makeVar(null)
export const albumTitleVar = makeVar(null)

export const add = (payload) => croppedFilesVar(payload)

export const reset = () => {
  croppedFilesVar([])
  selectedFilesVar([])
  selectedFileIdVar('')
  selectedAlbumVar(null)
}

export const setAlbum = (album) => {
  selectedAlbumVar(album)
}

export const setAlbumTitle = (title) => {
  albumTitleVar(title)
}

export const select = (payload) => {
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
