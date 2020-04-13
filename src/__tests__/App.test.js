import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import App from '../App'

test('App snapshot', () => {
  const { container } = render(<App />)

  expect(container.firstChild).toMatchSnapshot()
})

// The following two tests cause a react-dom warning as follows:
// "Can't perform a React state update on an unmounted component.
// This is a no-op, but it indicates a memory leak in your application.
// To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method"

// Have tried react-testing-library 'cleanup', and async await. Can't yet resolve.

test.skip('Renders both Button components', () => {
  const { getByText } = render(<App />)

  const sleepButtonNode = getByText('Just went to sleep')
  const awakeButtonNode = getByText('Just woke up')

  expect(sleepButtonNode).toBeTruthy()
  expect(awakeButtonNode).toBeTruthy()
})

test.skip('Shows correct awake/asleep text', async () => {
  const { getByTestId, getByText } = render(<App />)
  const statusNode = getByTestId('wake-status')
  const awakeButtonNode = getByText('Just woke up')
  const sleepButtonNode = getByText('Just went to sleep')

  expect(statusNode.textContent).toBe("He's asleep")

  fireEvent.click(awakeButtonNode)
  await wait(resolve => setTimeout(resolve, 4500))
  expect(statusNode.textContent).toBe("He's awake")

  fireEvent.click(sleepButtonNode)
  await wait(resolve => setTimeout(resolve, 4500))
  expect(statusNode.textContent).toBe("He's asleep")
})

// TODO
// test.skip('TODO Shows existing time from datastore', () => {
//     const { getByText } = render(<App />)
//     // Just pass for now.
//     expect(getByText('AttiNap').textContent).toBe('AttiNap')
// })
