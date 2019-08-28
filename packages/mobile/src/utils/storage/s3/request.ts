export default async (url, file) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

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

// export default async (url, file) =>
// new Promise((resolve, reject) => {
//   const form = new FormData()
//   form.append('file', file)
//   form.append('Content-Type', file.type)

//   fetch(url, {
//     body: form,
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   })
//     .then(response => alert(JSON.stringify(response)))
//     .catch(error => {
//       console.log('ERROR ', error)
//       reject(new Error(`Request failed. Status`))
//     })
//     .then(responseData => {
//       alert(JSON.stringify(responseData))
//       resolve({ filename: responseData.filename })
//     })
// })
