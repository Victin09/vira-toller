import { Outlet, Route, Routes } from 'react-router-dom'

import './app.css'
import { AppLayout } from './components/layouts/app-layout'
import { HomeLayout } from './components/layouts/home-layout'
import Home from './views/home'
import Login from './views/login'
import Register from './views/register'

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
        </Route>
        <Route element={<AppLayout />}>
          {/* <Route path="/" element={<Home />} /> */}
        </Route>
      </Routes>
    </>
  )
}

export default App
