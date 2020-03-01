import React from 'react'
import { render, renderIntoDocument, cleanup } from 'react-test-renderer'
import App from '../App'

beforeEach(cleanup)

test('App renders successfully', () => {
    const { container } = renderIntoDocument(<App />)

    expect(container).toMatchSnapshot()
})
