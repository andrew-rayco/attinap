import React from 'react'
import { render } from '@testing-library/react'
import App from '../App'

test('App snapshot', () => {
    const { container } = render(<App />)

    expect(container.firstChild).toMatchSnapshot()
})

test('Renders both Button components', () => {
    const { container, getByText } = render(<App />)

    const sleepButtonNode = getByText('Just went to sleep')
    const awakeButtonNode = getByText('Just woke up')

    expect(sleepButtonNode).toBeTruthy()
    expect(awakeButtonNode).toBeTruthy()
})
