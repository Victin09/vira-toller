import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import 'vira-design-system/dist/css/vira-design-system.css'
import 'vira-design-system/dist/js/vira-design-system.js'

import './index.css'
import App from './app'

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
)
