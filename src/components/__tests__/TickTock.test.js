import React from 'react'
import ReactDOM from 'react-dom'
import { render } from '@testing-library/react'
import TickTock from '../TickTock'

test('Renders button with `submit time` text', () => {
    const container = document.createElement('div')
    ReactDOM.render(<TickTock />, container)
    expect(container.textContent).toMatch('Submit time')
})

// Only snapshotting button. No need to test Timepicker module
test('TickTock button snapshot', () => {
    const { getByText } = render(<TickTock />)
    const submitTimeButton = getByText('Submit time')

    expect(submitTimeButton).toMatchSnapshot()
})
