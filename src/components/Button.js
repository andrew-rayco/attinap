import React from 'react'

const Button = props => {
    return (
        <div className={`btn ${props.className}`}>
            <button onClick={() => props.updateTime()}>{props.title}</button>
            <p>{props.time}</p>
            <p>{props.ago}</p>
        </div>
    )
}

export default Button
