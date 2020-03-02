import React from 'react'
import ReactDOM from 'react-dom'
import Button from '../Button'
import { render } from '@testing-library/react'

test('Renders correct button text with closed clock', () => {
    const container = document.createElement('div')
    ReactDOM.render(<Button isClockOpen={false} />, container)
    expect(container.textContent).toMatch('Undo last')
    expect(container.textContent).toMatch('Add time')
})

test('Renders correct button text with open clock', () => {
    const container = document.createElement('div')
    ReactDOM.render(<Button isClockOpen={true} />, container)
    expect(container.textContent).toMatch('Undo last')
    expect(container.textContent).toMatch('Close clock')
    expect(container.firstChild.className).toMatch('btn')
})

test('Renders main div with given className', () => {
    const container = document.createElement('div')
    ReactDOM.render(<Button className={'cheese'} />, container)
    expect(container.firstChild.className).toMatch('btn')
    expect(container.firstChild.className).toMatch('cheese')
})

test('Renders given title', () => {
    const container = document.createElement('div')
    ReactDOM.render(<Button title={'Wormwood Industrial'} />, container)
    expect(container.textContent).toMatch('Wormwood Industrial')
})

test('Renders `no time yet today` if no time given', () => {
    const container = document.createElement('div')
    ReactDOM.render(<Button time={'No time yet today'} />, container)

    expect(container.textContent).toMatch('No time yet today')
})

test('Renders time string if time given', () => {
    const { getByTestId } = render(<Button time={'this is the time'} />)
    const timeNode = getByTestId('time')
    expect(timeNode.textContent).toEqual('this is the time')
})

test('Button snapshot', () => {
    const { container } = render(<Button />)
    expect(container).toMatchSnapshot()
})
