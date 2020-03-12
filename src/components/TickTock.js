import React from 'react'
import PropTypes from 'prop-types'
import { Timepicker } from 'react-timepicker'

const TickTock = props => {
    return (
        <div className="time-picker">
            <button onClick={props.handleClockSubmit}>Submit time</button>
            <Timepicker
                hours={new Date().getHours()}
                minutes={new Date().getMinutes()}
                onChange={(hours, mins) => props.handleChange(hours, mins)}
                mode={props.timepickerMode}
            />
        </div>
    )
}

TickTock.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleClockSubmit: PropTypes.func.isRequired
}

export default TickTock
