import React from 'react'
import store from './store'
import {Provider} from 'react-redux'

const Container = ({children}) => (
    <Provider store={store}>
        {children}
    </Provider>
)

export default Container