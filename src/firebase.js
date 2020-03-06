import * as firebase from 'firebase/app'
import 'firebase/database'

import { config } from './firebase-config'

const {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
} = config

const firebaseConfig = {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
}

firebase.initializeApp(firebaseConfig)

export default firebase
