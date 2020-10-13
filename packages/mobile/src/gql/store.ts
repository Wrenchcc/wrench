import { makeVar } from '@apollo/client'

export const PROJECT = {
  MODEL: 'model',
  TITLE: 'title',
  TYPE: 'type',
}

export const POST = {
  CAPTION: 'caption',
  FILES: 'files',
  PROJECT_ID: 'projectId',
  SELECED_FILES: 'selectedFiles',
  SELECTED_ID: 'selectedId',
  IS_POSTING: 'isPosting',
}

export const TOAST = {
  CONTENT: 'content',
  SHOW: 'show',
  TYPE: 'type',
}

export const mentionVar = makeVar('')

const initialProjectState = {
  [PROJECT.MODEL]: null,
  [PROJECT.TITLE]: null,
  [PROJECT.TYPE]: null,
}

export const projectVar = makeVar(initialProjectState)
export const updateProjectVar = (field, payload) => projectVar({ [field]: payload })
export const resetProjectVar = () => projectVar(initialProjectState)
