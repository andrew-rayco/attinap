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
        if (snapshot.val()) {
          let times = snapshot.val()

          if (times.sleepTime) {
            callback(times)
          } else {
            // Add last night bedtime if no sleeptime yet today
            return database
              .ref(`${yesterday}`)
              .once('value')
              .then(yest => {
                const aDayAgo = yest.val()
                times.sleepTime = [
                  aDayAgo.sleepTime[aDayAgo.sleepTime.length - 1]
                ]
              })
              .then(() => callback(times))
          }
        } else {
          let lastNightBedTime = { awakeTime: [], sleepTime: [] }
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
