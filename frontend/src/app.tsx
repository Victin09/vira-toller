import { Route, Routes } from 'react-router-dom'

import './app.css'
import { ProtectedRoute } from './common/router/private-router.route'
import { AppLayout } from './components/layouts/app-layout'
import { HomeLayout } from './components/layouts/home-layout'
import Welcome from './views/welcome'
import Login from './views/login'
import Register from './views/register'
import Home from './views/home'

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
