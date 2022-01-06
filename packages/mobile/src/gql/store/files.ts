import { makeVar } from '@apollo/client'
import { MAX_SELECTED_FILES } from './constants'

export const croppedFilesVar = makeVar([])
export const croppedOptions = makeVar({})
export const selectedFilesVar = makeVar([])
export const selectedFile = makeVar(null)
export const selectedFileIdVar = makeVar('')
export const fallbackFileVar = makeVar(null)
export const selectedAlbumVar = makeVar(null)
export const albumTitleVar = makeVar(null)

export const add = (payload) => croppedFilesVar(payload)

export const reset = () => {
  croppedFilesVar([])
  selectedFilesVar([])
  selectedFile(null)
  selectedFileIdVar('')
  fallbackFileVar(null)
  selectedAlbumVar(null)
  croppedOptions({})
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

  fallbackFileVar(payload)

  if (!isPrevious && !isAdded && selectedFiles.length === MAX_SELECTED_FILES) {
    return
  }

  if (!isPrevious && isAdded) {
    selectedFileIdVar(currentId)
    selectedFilesVar(selectedFiles)
    selectedFile(selectedFiles.find(({ id }) => id === currentId) || fallbackFileVar())
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
  selectedFile(selectedFiles.find(({ id }) => id === selectedId) || fallbackFileVar())
}

export const edit = (payload) => {
  const selectedFiles = selectedFilesVar()
  const fallbackFile = fallbackFileVar()
  const selectedId = selectedFileIdVar()
  const options = croppedOptions()

  if (!selectedFiles.length) {
    selectedFilesVar([fallbackFile])
    selectedFileIdVar(fallbackFile.id)
    selectedFile(fallbackFileVar)
  }

  croppedOptions({ ...options, [selectedId]: payload })
}
