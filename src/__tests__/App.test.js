import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import App from '../App'

test('App snapshot', () => {
    const { container } = render(<App />)

    expect(container.firstChild).toMatchSnapshot()
})

test('Renders both Button components', () => {
    const { getByText } = render(<App />)

    const sleepButtonNode = getByText('Just went to sleep')
    const awakeButtonNode = getByText('Just woke up')

    expect(sleepButtonNode).toBeTruthy()
    expect(awakeButtonNode).toBeTruthy()
})

test('Shows correct awake/asleep text', async () => {
    const { getByTestId, getByText, Simulate } = render(<App />)
    const statusNode = getByTestId('wake-status')
    const sleepButtonNode = getByText('Just went to sleep')

    expect(statusNode.textContent).toBe("He's awake")

    fireEvent.click(sleepButtonNode)
    await wait(resolve => setTimeout(resolve, 4500))
    expect(statusNode.textContent).toBe("He's asleep")
})
