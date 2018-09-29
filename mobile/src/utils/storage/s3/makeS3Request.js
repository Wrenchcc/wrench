export default async (url, file, onProgress = () => {}) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest()

  xhr.upload.onprogress = evt => {
    if (evt.lengthComputable) {
      onProgress((evt.loaded / evt.total) * 100)
    }
  }

  xhr.open('PUT', url)
  xhr.setRequestHeader('Content-Type', file.type)

  xhr.onload = () => {
    if (xhr.status !== 200) {
      reject(new Error(`Request failed. Status: ${xhr.status}. Content: ${xhr.responseText}`))
    }

    resolve({ filename: file.filename })
  }

  xhr.send(file)
})
