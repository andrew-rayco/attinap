import React from 'react'
import PropTypes from 'prop-types'

const Button = props => {
  return (
    <div className={`btn ${props.className}`}>
      <button onClick={() => props.updateTime()}>{props.title}</button>
      <p className="light" data-testid="time">
        {props.time}
      </p>
      <p>{props.ago}</p>
      <div className="manage-links">
        <a href="#" onClick={() => props.deleteLast()}>
          Undo last
        </a>
        |
        <a href="#" onClick={() => props.toggleClock()}>
          {props.isClockOpen ? 'Close clock' : 'Add time'}
        </a>
      </div>
    </div>
  )
}

Button.propTypes = {
  className: PropTypes.string.isRequired,
  updateTime: PropTypes.func.isRequired,
  deleteLast: PropTypes.func.isRequired,
  toggleClock: PropTypes.func.isRequired,
  time: PropTypes.string.isRequired,
  isClockOpen: PropTypes.bool.isRequired
}

export default Button
