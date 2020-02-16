import React from 'react'

const SleepButton = props => {
    return (
        <>
            <button onClick={props.updateTime}>Just went to sleep</button>
            <p>{props.sleepTime}</p>
        </>
    )
}

export default SleepButton
