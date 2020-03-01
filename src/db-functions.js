import firebase from './firebase'

const database = firebase.database()

export function writeData(date, name, timeArray) {
    database.ref(`${date}/${name}`).set(timeArray, error => {
        if (error) {
            console.log('There has been a ballsup', error)
        } else {
            console.log('Data successfully saved')
        }
    })
}

export function readData(date, callback) {
    return database
        .ref(`${date}`)
        .once('value')
        .then(
            snapshot => {
                callback(snapshot.val())
            },
            error => {
                if (error) {
                    console.log('There has been a ballsup', error)
                } else {
                    console.log('Data successfully saved')
                }
            }
        )
}

export function deleteEntry(date, name, index) {
    return database.ref(`${date}/${name}/${index}`).remove(error => {
        if (error) {
            console.log('There has been a ballsup', errror)
        } else {
            console.log('Data successfully deleted')
        }
    })
}
