import { emit } from 'jetemit'
import { UPLOAD_PROGRESS } from 'utils/storage/constants'

export default async function uploadAsync(url: string, file: any, emitProgress: boolean) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    if (emitProgress) {
      xhr.upload.onprogress = evt => {
        emit(UPLOAD_PROGRESS, (evt.loaded / evt.total) * 100)
      }
    }

    xhr.open('PUT', url)
    xhr.setRequestHeader('Content-Type', file.type)

    xhr.onload = () => {
      if (xhr.status !== 200) {
        reject(new Error(`Request failed. Status: ${xhr.status}. Content: ${xhr.responseText}`))
      }
      resolve(xhr.responseText)
    }
    xhr.send(file)
  })
}
