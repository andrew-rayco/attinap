import React from 'react'
import { render, cleanup } from '@testing-library/react'
import App from '../App'

beforeEach(() => cleanup())

test('App snapshot', () => {
    const { container } = render(<App />)

    expect(container).toMatchSnapshot()
})
