import React from 'react'
import { render, renderIntoDocumennt } from 'react-test-renderer'
import App from '../App'
import * as firebase from './firebase'

jest.mock(firebase, () => {
    return true
})

test('App renders successfully', () => {
    const { container } = renderIntoDocument(<App />)

    container.firebase = jest.fn()
    expect(container).toMatchSnapshot()
})
