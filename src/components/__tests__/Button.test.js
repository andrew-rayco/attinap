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

test('Renders given time', () => {
    const container = document.createElement('div')
    ReactDOM.render(<Button time={'Sunday, 15:45:03 am'} />, container)
    expect(container.textContent).toMatch('Sunday, 15:45:03 am')
})

test('Button snapshot', () => {
    const { container } = render(<Button />)
    expect(container).toMatchSnapshot()
})
