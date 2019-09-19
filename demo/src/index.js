import React, { Component } from 'react'
import { render } from 'react-dom'
import { css, injectGlobal } from 'emotion'
import { Canvas, Box, Heading, Paragraph } from '@pndr/demo-utils'
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

class Demo extends Component {
    render() {
        return (
            <Canvas>
                <Heading>
                    Choose a file to import
                </Heading>
                <Box>
                    <Container>
                        <Example />
                    </Container>
                </Box>
            </Canvas>
        )
    }
}

render(<Demo />, document.querySelector('#demo'))
