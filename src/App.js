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
            sleepAgo: '',
            awakeAgo: '',
            sleepFrozen: false,
            awakeFrozen: false,
            clockEntries: [],
            timepickerMode: true,
            sleepClockOpen: false,
            awakeClockOpen: false,
            currentStatus: false,
            hasCollectedData: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleClockSubmit = this.handleClockSubmit.bind(this)
    }

    // -- Datastore --
    initialiseAndFetchData() {
        const todaysDate = moment().format('YYYY-M-D')
        return readData(todaysDate, data => {
            if (data) {
                const { awakeTime, sleepTime } = data
                const { lastWake, lastSleep } = this.getLastEvents(
                    awakeTime,
                    sleepTime
                )
                const awakeAgo = formatAgo(lastWake) || ''
                const sleepAgo = formatAgo(lastSleep) || ''
                let awakeFrozen = false
                let sleepFrozen = false
                if (moment(lastWake).isAfter(moment(lastSleep))) {
                    sleepFrozen = true
                } else {
                    awakeFrozen = true
                }
                this.setState({
                    awakeTime: awakeTime || [],
                    sleepTime: sleepTime || [],
                    awakeAgo,
                    sleepAgo,
                    awakeFrozen,
                    sleepFrozen,
                    hasCollectedData: true,
                    currentStatus: this.getCurrentSleepStatus(
                        lastWake,
                        lastSleep
                    )
                })
            }
        })
    }

    // Determine current awake status by most recent event
    getCurrentSleepStatus(wake, sleep) {
        if (wake && sleep) {
            return moment(wake).isAfter(moment(sleep))
        } else if (wake && !sleep) {
            return true
        } else if (!wake && sleep) {
            return false
        } else {
            return false
        }
    }

    getFrozen(type, newState) {
        let { awakeTime, sleepTime } = this.state
        if (type === 'sleepTime') {
            sleepTime = newState
        } else {
            awakeTime = newState
        }
        const { lastWake, lastSleep } = this.getLastEvents(awakeTime, sleepTime)

        let awakeFrozen = false
        let sleepFrozen = false
        if (lastWake && lastSleep) {
            // find most recent event and freeze the other as is.
            if (moment(lastWake).isAfter(moment(lastSleep))) {
                sleepFrozen = true
            } else {
                awakeFrozen = true
            }
        }

        return { sleepFrozen, awakeFrozen }
    }

    // Return the most recent events from sleep and wake arrays (or null)
    getLastEvents(awakes, sleeps) {
        return {
            lastWake: awakes ? awakes[awakes.length - 1] : null,
            lastSleep: sleeps ? sleeps[sleeps.length - 1] : null
        }
    }

    // -- State --
    updateTime(type) {
        const now = moment().format()
        const newState = this.state[type].concat(now)
        const ago = type === 'sleepTime' ? 'sleepAgo' : 'awakeAgo'
        const date = moment(now).format('YYYY-M-D')
        const { awakeFrozen, sleepFrozen } = this.getFrozen(type, newState)

        this.setState(
            {
                [type]: newState,
                [ago]: formatAgo(now),
                currentStatus: type == 'awakeTime',
                awakeFrozen,
                sleepFrozen
            },
            writeData(date, type, newState)
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
                console.log('Timer is running')

                this.timerId = setInterval(() => {
                    const {
                        sleepTime,
                        awakeTime,
                        sleepAgo,
                        awakeAgo
                    } = this.state

                    const { lastWake, lastSleep } = this.getLastEvents(
                        awakeTime,
                        sleepTime
                    )

                    let newAwakeAgo = formatAgo(lastWake)
                    let newSleepAgo = formatAgo(lastSleep)
                    let sleepFrozen = false
                    let awakeFrozen = false

                    if (lastWake && lastSleep) {
                        // find most recent event and freeze the other as is.
                        if (moment(lastWake).isAfter(moment(lastSleep))) {
                            newSleepAgo = sleepAgo
                            awakeFrozen = false
                            sleepFrozen = true
                        } else {
                            newAwakeAgo = awakeAgo
                            awakeFrozen = true
                            sleepFrozen = false
                        }
                    }

                    if (newSleepAgo !== sleepAgo || newAwakeAgo !== awakeAgo) {
                        this.setState({
                            sleepAgo: newSleepAgo,
                            awakeAgo: newAwakeAgo,
                            awakeFrozen,
                            sleepFrozen
                        })
                    }
                }, 46000)
            }
        } else {
            console.log('Timer is not running. There is nothing to count.')
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

    renderNoTime() {
        // This smells, but works to stop the box jumping when time renders
        return <span>&nbsp;</span>
    }

    renderAgo(type, ago, frozen) {
        const text = type == 'sleepTime' ? 'Slept for' : 'Was awake for'
        if (ago) {
            return frozen ? `${text} ${ago}` : ago
        }
        return this.renderNoTime()
    }

    render() {
        const {
            awakeTime,
            sleepTime,
            awakeAgo,
            sleepAgo,
            awakeFrozen,
            sleepFrozen,
            hasCollectedData
        } = this.state
        const { lastWake, lastSleep } = this.getLastEvents(awakeTime, sleepTime)
        if (
            awakeTime.length == 0 &&
            sleepTime.length == 0 &&
            !hasCollectedData
        ) {
            this.initialiseAndFetchData()
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
                    ago={this.renderAgo('sleepTime', sleepAgo, sleepFrozen)}
                    className={'sleep-time'}
                    addTime={() => this.addTime('sleepClockOpen')}
                    isClockOpen={this.state.sleepClockOpen}
                />

                {this.state.sleepClockOpen
                    ? this.renderTickTock('sleepTime')
                    : null}

                <Button
                    time={formatTime(lastWake)}
                    updateTime={() => this.updateTime('awakeTime')}
                    deleteLast={() => this.deleteLast('awakeTime')}
                    title={'Just woke up'}
                    ago={this.renderAgo('awakeTime', awakeAgo, awakeFrozen)}
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
