import EventEmitter from 'eventemitter3'

const Emitter = new EventEmitter()

export default async (url, file, id) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest()

  xhr.upload.onprogress = evt => {
    if (evt.lengthComputable) {
      Emitter.emit('upload-progress', { id, percentge: evt.loaded / evt.total })
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

// import EventEmitter from 'eventemitter3'
//
// const emitter = new EventEmitter()
//
// const TAB_BAR_VISIBILITY_CHANGE = 'tabBarVisibilityChange'
//
// export const onTabBarVisibilityChange = callback => {
//   emitter.on(TAB_BAR_VISIBILITY_CHANGE, callback)
//   const subscription = {
//     remove: () => emitter.removeListener(TAB_BAR_VISIBILITY_CHANGE, callback),
//   }
//   return subscription
// }
//
// export const emitTabBarVisibilityChange = (visibility, animated) => {
//   emitter.emit(TAB_BAR_VISIBILITY_CHANGE, visibility, animated)
// }
