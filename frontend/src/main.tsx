import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import 'vds-ui/dist/css/vds.min.css'
import VdsUi from 'vds-ui/dist/js/vds.min.js'
import Icons from 'vds-ui/dist/js/vds-icons.min.js'

import './index.css'
import App from './app'

VdsUi.use(Icons)

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
)
