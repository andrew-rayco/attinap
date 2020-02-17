import React, { Component } from 'react'
import moment from 'moment'

import Button from './components/Button'

import './css/App.css'

class App extends Component {
    state = {
        sleepTime: '',
        awakeTime: ''
    }

    updateTime(time) {
        const now = new Date()

        this.setState({
            [time]: moment(now)
        })
    }

    formatTime(time) {
        return time
            ? moment(time).format('dddd, MMMM Do YYYY, h:mm:ss a')
            : 'No time yet'
    }

    formatAgo(time) {
        return time ? moment(time).fromNow() : ''
    }

    render() {
        const { sleepTime, awakeTime } = this.state

        return (
            <div className="main">
                <Button
                    time={this.formatTime(sleepTime)}
                    updateTime={() => this.updateTime('sleepTime')}
                    title={'Just went to sleep'}
                    ago={this.formatAgo(sleepTime)}
                    className={'sleep-time'}
                />
                <Button
                    time={this.formatTime(awakeTime)}
                    updateTime={() => this.updateTime('awakeTime')}
                    title={'Just woke up'}
                    ago={this.formatAgo(awakeTime)}
                    className={'awake-time'}
                />
            </div>
        )
    }
}

export default App
