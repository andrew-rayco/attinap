import React from 'react'
import ReactDOM from 'react-dom'
import Button from '../Button'
import { render } from '@testing-library/react'

const requiredProps = {
  updateTime: jest.fn(),
  deleteLast: jest.fn(),
  addTime: jest.fn(),
  time: 'This is the time',
  isClockOpen: false,
  className: 'cheese'
}

test('Renders correct button text with closed clock', () => {
  const container = document.createElement('div')
  ReactDOM.render(
    <Button {...requiredProps} isClockOpen={false} className={'cheese'} />,
    container
  )
  expect(container.textContent).toMatch('Undo last')
  expect(container.textContent).toMatch('Add time')
})

test('Renders correct button text with open clock', () => {
  const container = document.createElement('div')
  ReactDOM.render(<Button {...requiredProps} isClockOpen={true} />, container)
  expect(container.textContent).toMatch('Undo last')
  expect(container.textContent).toMatch('Close clock')
  expect(container.firstChild.className).toMatch('btn')
})

test('Renders main div with given className', () => {
  const container = document.createElement('div')
  ReactDOM.render(<Button {...requiredProps} className={'cheese'} />, container)
  expect(container.firstChild.className).toMatch('btn')
  expect(container.firstChild.className).toMatch('cheese')
})

test('Renders given title', () => {
  const container = document.createElement('div')
  ReactDOM.render(
    <Button {...requiredProps} title={'Wormwood Industrial'} />,
    container
  )
  expect(container.textContent).toMatch('Wormwood Industrial')
})

test('Renders `no time yet today` if no time given', () => {
  const container = document.createElement('div')
  ReactDOM.render(
    <Button {...requiredProps} time={'No time yet today'} />,
    container
  )

  expect(container.textContent).toMatch('No time yet today')
})

test('Renders time string if time given', () => {
  const { getByTestId } = render(
    <Button {...requiredProps} time={'this is the time'} />
  )
  const timeNode = getByTestId('time')
  expect(timeNode.textContent).toEqual('this is the time')
})

test('Button snapshot', () => {
  const { container } = render(<Button {...requiredProps} />)
  expect(container).toMatchSnapshot()
})
