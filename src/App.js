import React, { Component } from 'react'
import SleepButton from './components/SleepButton'

import moment from 'moment'

class App extends Component {
    state = { sleepTime: 'No time yet' }

    updateTime() {
        const now = new Date()
        this.setState({
            sleepTime: moment(now).format('dddd, MMMM Do YYYY, h:mm:ss a')
        })
    }

    render() {
        return (
            <>
                <SleepButton
                    sleepTime={this.state.sleepTime}
                    updateTime={() => this.updateTime()}
                />
            </>
        )
    }
}

export default App
