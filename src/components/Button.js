import React from 'react'

const Button = props => {
    return (
        <div className={`btn ${props.className}`}>
            <button onClick={() => props.updateTime()}>{props.title}</button>
            <p>{props.time}</p>
            <p>{props.ago}</p>
            <a href="#" onClick={() => props.deleteLast()}>
                Remove last
            </a>
        </div>
    )
}

export default Button
