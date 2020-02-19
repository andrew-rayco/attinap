import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

let database = firebase.database()

function writeUserData(name) {
    database.ref('dudes/' + 1).set({
        username: name
    })
}

writeUserData('Andy')
writeUserData('Maria')

ReactDOM.render(<App />, document.getElementById('root'))
