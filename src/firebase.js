let database = firebase.database()

export function writeData(date, name, timeArray) {
    database.ref(`${date}/${name}`).set(timeArray, error => {
        if (error) {
            console.log('There has been a ballsup', error)
        } else {
            console.log('Data successfully saved')
        }
    })
}

export function readData(date, name, callback) {
    console.log('hitting')

    return database
        .ref(`${date}/${name}`)
        .once('value')
        .then(snapshot => {
            callback(snapshot.val())
        })
}
