export function makeS3Request(data, uri) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.upload.addEventListener('progress', evt => {
      console.log(`Uploaded: ${parseInt((evt.loaded * 100) / evt.total)}%`)
    })

    xhr.open('PUT', data.url)
    xhr.setRequestHeader('Content-Type', data.type)
    xhr.send({ uri, type: data.type, name: data.filename })

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('upload success')
        }
      }
    }
  })
}
