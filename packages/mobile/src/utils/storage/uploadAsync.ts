export default async function uploadAsync(url: string, file: any) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

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
