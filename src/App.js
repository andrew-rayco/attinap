import React, { Component } from 'react'
import Button from './components/Button'

import moment from 'moment'

class App extends Component {
    state = {
        sleepTime: 'No time yet',
        awakeTime: 'No time yet'
    }

    updateTime(time) {
        const now = new Date()

        this.setState({
            [time]: moment(now).format('dddd, MMMM Do YYYY, h:mm:ss a')
        })
    }

    render() {
        return (
            <>
                <Button
                    time={this.state.sleepTime}
                    updateTime={() => this.updateTime('sleepTime')}
                    title={'Just went to sleep'}
                />
                <Button
                    time={this.state.awakeTime}
                    updateTime={() => this.updateTime('awakeTime')}
                    title={'Just woke up'}
                />
            </>
        )
    }
}

export default App
