import React, { Component } from 'react'
import moment from 'moment'

import Button from './components/Button'
import TickTock from './components/TickTock'

import 'react-timepicker/timepicker.css'
import './scss/index.scss'

import { writeData, readData, deleteEntry } from './datastore-functions'
import { formatTime, formatAgo, getTimeDiff } from './utils'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sleepTime: [],
      awakeTime: [],
      sleepAgo: '',
      awakeAgo: '',
      sleptFor: '',
      awakeFor: '',
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
    const yesterdaysDate = moment()
      .subtract(1, 'days')
      .format('YYYY-M-D')

    return readData(todaysDate, yesterdaysDate, data => {
      if (data) {
        const { awakeTime, sleepTime } = data
        const { lastWake, lastSleep } = this.getLastEvents(awakeTime, sleepTime)
        const awakeAgo = formatAgo(lastWake) || ''
        const sleepAgo = formatAgo(lastSleep) || ''
        let awakeFrozen = false
        let sleepFrozen = false
        let sleptFor = ''
        let awakeFor = ''

        // If events of both type exist, find difference between latest of each
        // and allocate an ago string to `sleptFor` or `awakeFor` accordingly
        if (lastWake && lastSleep) {
          if (moment(lastWake).isAfter(moment(lastSleep))) {
            sleepFrozen = true
            sleptFor = getTimeDiff(lastSleep, lastWake)
          } else {
            awakeFrozen = true
            awakeFor = getTimeDiff(lastWake, lastSleep)
          }
        }
        this.setState(
          {
            awakeTime: awakeTime || [],
            sleepTime: sleepTime || [],
            awakeAgo,
            sleepAgo,
            awakeFor,
            sleptFor,
            awakeFrozen,
            sleepFrozen,
            hasCollectedData: true,
            currentStatus: this.getCurrentSleepStatus(lastWake, lastSleep)
          },
          () => {
            if (
              (awakeTime && awakeTime.length !== 0) ||
              (sleepTime && sleepTime.length !== 0)
            ) {
              this.startTimer()
            }
          }
        )
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
    let sleptFor = ''
    let awakeFor = ''
    if (lastWake && lastSleep) {
      // find most recent event and freeze the other as is.
      if (moment(lastWake).isAfter(moment(lastSleep))) {
        sleepFrozen = true
        sleptFor = getTimeDiff(lastSleep, lastWake)
      } else {
        awakeFrozen = true
        awakeFor = getTimeDiff(lastWake, lastSleep)
      }
    }

    return { sleepFrozen, awakeFrozen, awakeFor, sleptFor }
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
    const agoType = type === 'sleepTime' ? 'sleepAgo' : 'awakeAgo'
    const date = moment(now).format('YYYY-M-D')
    const { awakeFrozen, sleepFrozen, sleptFor, awakeFor } = this.getFrozen(
      type,
      newState
    )

    this.setState(
      {
        [type]: newState,
        [agoType]: formatAgo(now),
        currentStatus: type == 'awakeTime',
        awakeFor,
        sleptFor,
        awakeFrozen,
        sleepFrozen
      },
      writeData(date, type, newState)
    )
  }

  deleteLast(type) {
    let typeState = this.state[type]
    let index = typeState.length - 1
    const date = moment(new Date()).format('YYYY-M-D')

    // Remove last entry from dataStore
    deleteEntry(date, type, index)

    // Remove last entry from state entries
    typeState.pop()

    // == Update State ==
    // Calculates updated 'awake for'/'slept for' after entry removal
    const { awakeFrozen, sleepFrozen, sleptFor, awakeFor } = this.getFrozen(
      type,
      typeState
    )

    // Get latest time for sleep and awake to determine new currentStatus
    let { awakeTime, sleepTime } = this.state
    if (type === 'sleepTime') {
      sleepTime = typeState
    } else {
      awakeTime = typeState
    }
    const { lastWake, lastSleep } = this.getLastEvents(awakeTime, sleepTime)

    this.setState({
      [type]: typeState,
      currentStatus: moment(lastWake).isAfter(moment(lastSleep)),
      awakeFrozen,
      sleepFrozen,
      sleptFor,
      awakeFor
    })
  }

  handleChange(hours, mins) {
    const newTime = { h: hours, m: mins }
    const newState = this.state.clockEntries.concat(newTime)

    this.setState({ clockEntries: newState, timepickerMode: false })
  }

  handleClockSubmit(type) {
    // take last entry from clockEntries and add to selected sleep/awake state
    const { clockEntries } = this.state

    const newTime = moment(clockEntries[clockEntries.length - 1]).format()
    const date = moment(newTime).format('YYYY-M-D')
    const newState = this.state[type].concat(newTime)
    const toggleType = type == 'sleepTime' ? 'sleepClockOpen' : 'awakeClockOpen'
    const agoType = type === 'sleepTime' ? 'sleepAgo' : 'awakeAgo'
    const { awakeFrozen, sleepFrozen, sleptFor, awakeFor } = this.getFrozen(
      type,
      newState
    )
    this.setState(
      {
        [type]: newState,
        [agoType]: formatAgo(newTime),
        currentStatus: type == 'awakeTime',
        awakeFor,
        sleptFor,
        awakeFrozen,
        sleepFrozen,
        [toggleType]: !this.state[toggleType]
      },
      writeData(date, type, newState)
    )
  }

  toggleClock(type) {
    this.setState({ [type]: !this.state[type] })
  }

  // Polls every 46 seconds (moment fromNow() changes at 45) to auto-update agos
  startTimer() {
    if (!this.timerId) {
      this.timerId = setInterval(() => {
        const { sleepTime, awakeTime, sleepAgo, awakeAgo } = this.state

        const { lastWake, lastSleep } = this.getLastEvents(awakeTime, sleepTime)

        let newAwakeAgo = formatAgo(lastWake)
        let newSleepAgo = formatAgo(lastSleep)
        let sleepFrozen = false
        let awakeFrozen = false

        if (lastWake && lastSleep) {
          // find most recent event and freeze the other as is.
          if (moment(lastWake).isAfter(moment(lastSleep))) {
            newSleepAgo = sleepAgo
            sleepFrozen = true
          } else {
            newAwakeAgo = awakeAgo
            awakeFrozen = true
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
  }

  // -- Render --
  renderTickTock(type) {
    return (
      <TickTock
        mode={this.state.timepickerMode}
        handleChange={(hours, mins) => this.handleChange(hours, mins)}
        timepickerMode={this.state.timepickerMode}
        handleClockSubmit={() => this.handleClockSubmit(type)}
      />
    )
  }

  renderNoTime() {
    // This smells, but works to stop the box jumping when time renders
    return <span>&nbsp;</span>
  }

  renderAgo(type, ago, frozen, frozenTime) {
    const text = type == 'sleepTime' ? 'Slept for' : 'Was awake for'
    if (frozen) {
      return (
        <span>
          {`${text}:`}
          <br />
          {frozenTime}
        </span>
      )
    } else if (ago && this.state[type].length >= 1) {
      return (
        <span>
          &nbsp;
          <br />
          {`${ago}`}
        </span>
      )
    }
    return this.renderNoTime()
  }

  render() {
    const {
      awakeTime,
      sleepTime,
      awakeAgo,
      sleepAgo,
      sleptFor,
      awakeFor,
      awakeFrozen,
      sleepFrozen,
      hasCollectedData
    } = this.state
    const { lastWake, lastSleep } = this.getLastEvents(awakeTime, sleepTime)
    if (awakeTime.length == 0 && sleepTime.length == 0 && !hasCollectedData) {
      this.initialiseAndFetchData()
    }

    return (
      <div
        className={this.state.currentStatus ? `container` : `container dark`}
      >
        <div className={this.state.currentStatus ? `main` : `main dark`}>
          <h1>AttiNap</h1>
          <p>Currently:</p>
          <h2 data-testid="wake-status">
            {this.state.currentStatus ? "He's awake" : "He's asleep"}
          </h2>
          <div className="actions">
            <Button
              time={formatTime(lastSleep)}
              updateTime={() => this.updateTime('sleepTime')}
              deleteLast={() => this.deleteLast('sleepTime')}
              title={'Just went to sleep'}
              ago={this.renderAgo('sleepTime', sleepAgo, sleepFrozen, sleptFor)}
              className={'sleep-time'}
              toggleClock={() => this.toggleClock('sleepClockOpen')}
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
              ago={this.renderAgo('awakeTime', awakeAgo, awakeFrozen, awakeFor)}
              className={'awake-time'}
              toggleClock={() => this.toggleClock('awakeClockOpen')}
              isClockOpen={this.state.awakeClockOpen}
            />

            {this.state.awakeClockOpen
              ? this.renderTickTock('awakeTime')
              : null}
          </div>
        </div>
      </div>
    )
  }
}

export default App
