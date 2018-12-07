import React, {Component} from 'react'
import {render} from 'react-dom'
import {css, injectGlobal} from 'emotion'
import Example from './Example'
import Container from './Container'

injectGlobal`
    body {
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
    }
    * {
        box-sizing: border-box;
    }
`

const Viewport = ({children}) => (
    <div
        className={css`
            background-color: #e9ebee;
            padding: 20px;
        `}
    >
        {children}
    </div>
)

class Demo extends Component {
    render() {
        return <div>
            <h1>CSVImport Demo</h1>
            <Viewport>
                <Container>
                    <Example />
                </Container>
            </Viewport>
        </div>
    }
}

render(<Demo/>, document.querySelector('#demo'))
