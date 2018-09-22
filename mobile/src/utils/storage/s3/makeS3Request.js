export default async (url, file) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest()

  xhr.open('PUT', url)
  xhr.setRequestHeader('Content-Type', file.type)

  xhr.onload = () => {
    if (xhr.status !== 200) {
      reject(new Error(`Request failed. Status: ${xhr.status}. Content: ${xhr.responseText}`))
    }

    resolve(file)
  }

  xhr.send(file)
})
