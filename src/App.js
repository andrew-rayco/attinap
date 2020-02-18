import React, { Component } from 'react'
import moment from 'moment'

import Button from './components/Button'

import './scss/index.scss'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sleepTime: [],
            awakeTime: []
        }

        this.updateTime = this.updateTime.bind(this)
    }

    updateTime(time) {
        const now = new Date()
        const newState = this.state[time].concat(now)

        this.setState({
            [time]: newState
        })
    }

    deleteLast(name) {
        let currentState = this.state[name]
        currentState.pop()

        this.setState({ [name]: currentState })
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
        const lastSleep = sleepTime[sleepTime.length - 1]
        const lastWake = awakeTime[awakeTime.length - 1]

        return (
            <div className="main">
                <Button
                    time={this.formatTime(lastSleep)}
                    updateTime={() => this.updateTime('sleepTime')}
                    deleteLast={() => this.deleteLast('sleepTime')}
                    title={'Just went to sleep'}
                    ago={this.formatAgo(lastSleep)}
                    className={'sleep-time'}
                />
                <Button
                    time={this.formatTime(awakeTime[awakeTime.length - 1])}
                    updateTime={() => this.updateTime('awakeTime')}
                    deleteLast={() => this.deleteLast('awakeTime')}
                    title={'Just woke up'}
                    ago={this.formatAgo(lastWake)}
                    className={'awake-time'}
                />
                <div className="time-picker"></div>
            </div>
        )
    }
}

export default App
