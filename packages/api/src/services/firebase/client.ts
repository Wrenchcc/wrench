import * as admin from 'firebase-admin'

export default admin.initializeApp({
  credential: admin.credential.cert(require('./wrench-app-firebase.json')),
})
