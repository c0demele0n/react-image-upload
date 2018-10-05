import * as firebase from 'firebase'

const config = {
    apiKey: 'AIzaSyB0SQ8l_gmwVPgw8krL7_L8fXrDo25ZVcE',
    authDomain: 'react-image-upload.firebaseapp.com',
    databaseURL: 'https://react-image-upload.firebaseio.com',
    projectId: 'react-image-upload',
    storageBucket: 'react-image-upload.appspot.com',
    messagingSenderId: '1092220134657'
}

export function initFirebase() {
    firebase.initializeApp(config)
}

export function getDatabase() {
    return firebase.database()
}

export function getStorage() {
    return firebase.storage()
}
