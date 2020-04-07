import firebase from './firebase'

const database = firebase.database()

export function writeData(date, name, timeArray) {
  database.ref(`${date}/${name}`).set(timeArray, error => {
    if (error) {
      console.log('There has been a ballsup', error)
    }
  })
}

export function readData(date, yesterday, callback) {
  return database
    .ref(`${date}`)
    .once('value')
    .then(
      snapshot => {
        let lastNightBedTime = { awakeTime: [], sleepTime: [] }
        if (snapshot.val()) {
          callback(snapshot.val())
        } else {
          database
            .ref(`${yesterday}`)
            .once('value')
            .then(yest => {
              const aDayAgo = yest.val()
              lastNightBedTime.sleepTime.push(
                aDayAgo.sleepTime[aDayAgo.sleepTime.length - 1]
              )
            })
            .then(() => callback(lastNightBedTime))
        }
      },
      error => {
        if (error) {
          console.log('There has been a ballsup', error)
        }
      }
    )
}

export function deleteEntry(date, name, index) {
  return database.ref(`${date}/${name}/${index}`).remove(error => {
    if (error) {
      console.log('There has been a ballsup', errror)
    }
  })
}
