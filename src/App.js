import React, { Component } from 'react'
import moment from 'moment'

import Button from './components/Button'
import TickTock from './components/TickTock'

import 'react-timepicker/timepicker.css'
import './scss/index.scss'

import { writeData, readData, deleteEntry } from './datastore-functions'
import { formatTime, formatAgo } from './utils'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sleepTime: [],
            awakeTime: [],
            clockEntries: [],
            timepickerMode: true,
            sleepClockOpen: false,
            awakeClockOpen: false,
            sleepAgo: '',
            awakeAgo: '',
            currentStatus: true,
            hasCollectedData: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleClockSubmit = this.handleClockSubmit.bind(this)
    }

    // -- Datastore --
    getData() {
        const todaysDate = moment().format('YYYY-M-D')
        return readData(todaysDate, data => {
            if (data) {
                this.setState({
                    awakeTime: data.awakeTime || [],
                    sleepTime: data.sleepTime || [],
                    hasCollectedData: true
                })
            }
        })
    }

    updateDataStore(date, time, newState) {
        // Format time entries for datastore
        const cleanState = newState.map(time => {
            return moment(time).format()
        })

        writeData(date, time, cleanState)
    }

    // -- State --
    updateTime(time) {
        const now = new Date()
        const newState = this.state[time].concat(now)
        const ago = time === 'sleepTime' ? 'sleepAgo' : 'awakeAgo'
        const date = moment(now).format('YYYY-M-D')

        this.setState(
            {
                [time]: newState,
                [ago]: formatAgo(now),
                currentStatus: time == 'awakeTime'
            },
            this.updateDataStore(date, time, newState)
        )
    }

    deleteLast(name) {
        let currentState = this.state[name]
        let index = currentState.length - 1
        const date = moment(new Date()).format('YYYY-M-D')

        deleteEntry(date, name, index)

        currentState.pop()

        this.setState({ [name]: currentState })
    }

    handleChange(hours, mins) {
        const newTime = { h: hours, m: mins }
        const newState = this.state.clockEntries.concat(newTime)

        this.setState({ clockEntries: newState, timepickerMode: false })
    }

    handleClockSubmit(name) {
        // take last entry from clockEntries and add to selected sleep/awake state
        const { clockEntries } = this.state

        const newTime = moment(clockEntries[clockEntries.length - 1])
        const newState = this.state[name].concat(newTime)
        const toggle = name == 'sleepTime' ? 'sleepClockOpen' : 'awakeClockOpen'
        this.setState({ [name]: newState, [toggle]: !this.state[toggle] })
    }

    addTime(name) {
        this.setState({ [name]: !this.state[name] })
    }

    // Polls every 46 seconds (moment fromNow() changes at 45) to auto-update agos
    startTimer() {
        if (this.state.sleepAgo !== '' || this.state.awakeAgo !== '') {
            if (!this.timerId) {
                this.timerId = setInterval(() => {
                    const {
                        sleepTime,
                        awakeTime,
                        sleepAgo,
                        awakeAgo
                    } = this.state

                    const newSleepAgo = formatAgo(
                        sleepTime[sleepTime.length - 1]
                    )
                    const newAwakeAgo = formatAgo(
                        awakeTime[awakeTime.length - 1]
                    )

                    if (newSleepAgo !== sleepAgo || newAwakeAgo !== awakeAgo) {
                        this.setState({
                            sleepAgo: newSleepAgo,
                            awakeAgo: newAwakeAgo
                        })
                    }
                }, 46000)
            }
        }
    }

    // -- Render --
    renderTickTock(name) {
        return (
            <TickTock
                mode={this.state.timepickerMode}
                handleChange={(hours, mins) => this.handleChange(hours, mins)}
                timepickerMode={this.state.timepickerMode}
                handleClockSubmit={() => this.handleClockSubmit(name)}
            />
        )
    }

    render() {
        const { sleepTime, awakeTime, hasCollectedData } = this.state
        const lastSleep = sleepTime ? sleepTime[sleepTime.length - 1] : null
        const lastWake = awakeTime ? awakeTime[awakeTime.length - 1] : null
        if (
            awakeTime.length == 0 &&
            sleepTime.length == 0 &&
            !hasCollectedData
        ) {
            this.getData()
        }
        this.startTimer()

        return (
            <div className="main">
                <h1>AttiNap</h1>
                <p>Currently:</p>
                <h2 data-testid="wake-status">
                    {this.state.currentStatus ? "He's awake" : "He's asleep"}
                </h2>
                <Button
                    time={formatTime(lastSleep)}
                    updateTime={() => this.updateTime('sleepTime')}
                    deleteLast={() => this.deleteLast('sleepTime')}
                    title={'Just went to sleep'}
                    ago={formatAgo(lastSleep)}
                    className={'sleep-time'}
                    addTime={() => this.addTime('sleepClockOpen')}
                    isClockOpen={this.state.sleepClockOpen}
                />

                {this.state.sleepClockOpen
                    ? this.renderTickTock('sleepTime')
                    : null}

                <Button
                    time={formatTime(awakeTime[awakeTime.length - 1])}
                    updateTime={() => this.updateTime('awakeTime')}
                    deleteLast={() => this.deleteLast('awakeTime')}
                    title={'Just woke up'}
                    ago={formatAgo(lastWake)}
                    className={'awake-time'}
                    addTime={() => this.addTime('awakeClockOpen')}
                    isClockOpen={this.state.awakeClockOpen}
                />

                {this.state.awakeClockOpen
                    ? this.renderTickTock('awakeTime')
                    : null}
            </div>
        )
    }
}

export default App
