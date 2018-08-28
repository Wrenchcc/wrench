import { links } from 'react-native-firebase'

links()
  .getInitialLink()
  .then(url => {
    if (url) {
      console.log(url)
    } else {
      console.log('not')
    }
  })

// subscribe
links().onLink(url => {
  console.log(url)
})
