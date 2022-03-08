import 'vira-design-system/dist/css/vira-design-system.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import viraDesignSystem from 'vira-design-system'

import './index.css'
import App from './app'

// Initialize frontend framework
viraDesignSystem.onDOMContentLoaded()

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
