import EventEmitter from 'eventemitter3'

const emitter = new EventEmitter()

const UPLOAD_PROGRESS = 'upload_progress'

export function sendUploadProgress(id, progress) {
  emitter.emit(UPLOAD_PROGRESS, id, progress)
}

// TODO: Fix progress
export function onUploadProgress(fn) {
  const totalProgress = {}
  emitter.on(UPLOAD_PROGRESS, (id, progress) => {
    totalProgress[id] = progress
    const arr = Object.values(totalProgress)
    return fn(arr.reduce((a, b) => a + b, 0) / arr.length)
  })
}
