import EventEmitter from 'eventemitter3'

const emitter = new EventEmitter()

const UPLOAD_PROGRESS = 'uploadProgress'

export function sendUploadProgress(id, progress) {
  emitter.emit(UPLOAD_PROGRESS, progress)
}

export function onUploadProgress(fn) {
  emitter.on(UPLOAD_PROGRESS, fn)
}
