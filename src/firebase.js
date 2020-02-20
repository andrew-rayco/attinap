let database = firebase.database()

export function writeUserData(date, name, timeArray) {
    database.ref(`${date}/${name}`).set(timeArray, error => {
        if (error) {
            console.log('There has been a ballsup', error)
        } else {
            console.log('Data successfully saved')
        }
    })
}
