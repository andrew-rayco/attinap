import React from 'react'
import { Timepicker } from 'react-timepicker'

const TickTock = props => {
    return (
        <div className="time-picker">
            <Timepicker
                hours={new Date().getHours()}
                minutes={new Date().getMinutes()}
                onChange={(hours, mins) => props.handleChange(hours, mins)}
                mode={props.timepickerMode}
            />
            <button onClick={props.handleClockSubmit}>Submit time</button>
        </div>
    )
}

export default TickTock
