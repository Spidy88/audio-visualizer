import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './app'

import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import BootstrapSlider from 'bootstrap-slider/dist/css/bootstrap-slider.css'

const rootEl = document.getElementById('app')

ReactDOM.render(
    <AppContainer>
        <App />
    </AppContainer>,
    rootEl
)

if( module.hot ) {
    module.hot.accept('./app', () => {
        const NextApp = require('./app').default
        ReactDOM.render(
            <AppContainer>
                <NextApp />
            </AppContainer>,
            rootEl
        )
    })
}