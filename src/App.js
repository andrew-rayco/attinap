import React, { Component } from 'react'
import moment from 'moment'

import Button from './components/Button'
import TickTock from './components/TickTock'

import 'react-timepicker/timepicker.css'
import './scss/index.scss'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sleepTime: [],
            awakeTime: [],
            clockEntries: [],
            timepickerMode: true,
            sleepClockOpen: false,
            awakeClockOpen: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleClockSubmit = this.handleClockSubmit.bind(this)
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

    handleChange(hours, mins) {
        const newTime = { h: hours, m: mins }
        const newState = this.state.clockEntries.concat(newTime)

        this.setState({ clockEntries: newState, timepickerMode: false })
    }

    handleClockSubmit() {
        // take last entry from clockEntries and add to selected sleep/awake state
        const { clockEntries, sleepTime } = this.state
        const newTime = moment(clockEntries[clockEntries.length - 1])
        const newState = sleepTime.concat(newTime)
        this.setState({ sleepTime: newState })
    }

    addTime(name) {
        this.setState({ [name]: !this.state[name] })
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
                    addTime={() => this.addTime('sleepClockOpen')}
                    isClockOpen={this.state.sleepClockOpen}
                />
                {this.state.sleepClockOpen ? (
                    <TickTock
                        mode={this.state.timepickerMode}
                        handleChange={(hours, mins) =>
                            this.handleChange(hours, mins)
                        }
                        timepickerMode={this.state.timepickerMode}
                        handleClockSubmit={this.handleClockSubmit}
                    />
                ) : null}
                <Button
                    time={this.formatTime(awakeTime[awakeTime.length - 1])}
                    updateTime={() => this.updateTime('awakeTime')}
                    deleteLast={() => this.deleteLast('awakeTime')}
                    title={'Just woke up'}
                    ago={this.formatAgo(lastWake)}
                    className={'awake-time'}
                    addTime={() => this.addTime('awakeClockOpen')}
                    isClockOpen={this.state.awakeClockOpen}
                />
            </div>
        )
    }
}

export default App
