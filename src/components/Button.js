import React from 'react'

const Button = props => {
    return (
        <div className={`btn ${props.className}`}>
            <button onClick={() => props.updateTime()}>{props.title}</button>
            <p className="light">{props.time}</p>
            <p>{props.ago}</p>
            <div className="manage-links">
                <a href="#" onClick={() => props.deleteLast()}>
                    Undo last
                </a>
                |
                <a href="#" onClick={() => props.addTime()}>
                    {props.isClockOpen ? 'Close clock' : 'Add time'}
                </a>
            </div>
        </div>
    )
}

export default Button
