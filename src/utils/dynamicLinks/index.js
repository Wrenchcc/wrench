// import { links } from 'react-native-firebase'
// import { navigateToProfile } from 'navigation'
//
// links()
//   .getInitialLink()
//   .then(url => {
//     if (url) {
//       console.log(url)
//       navigateToProfile({ user: { username: 'pontus' } })
//       // app opened from a url
//     } else {
//       console.log('not')
//       // app NOT opened from a url
//     }
//   })
//
// // subscribe
// links().onLink(url => {
//   navigateToProfile({ user: { username: 'pontus' } })
// })

// const link = new links.DynamicLink('https://wrench.cc/user/pontus', 'wrench.page.link').android
//   .setPackageName('com.wrench')
//   .ios.setBundleId('cc.wrench.app')
//
// links()
//   .createShortDynamicLink(link, 'SHORT')
//   .then(url => console.log(url))
