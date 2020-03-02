import * as firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
    apiKey: 'AIzaSyCb5zp9ElI0-OEcfQIZNBI_ND43leKwxVc',
    authDomain: 'attinap2020.firebaseapp.com',
    databaseURL: 'https://attinap2020.firebaseio.com',
    projectId: 'attinap2020',
    storageBucket: 'attinap2020.appspot.com',
    messagingSenderId: '482919166374',
    appId: '1:482919166374:web:615a4659ac11fb94445f67'
}

firebase.initializeApp(firebaseConfig)

export default firebase
