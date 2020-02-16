import React from 'react'

const Button = props => {
    return (
        <>
            <button onClick={() => props.updateTime()}>{props.title}</button>
            <p>{props.time}</p>
        </>
    )
}

export default Button
