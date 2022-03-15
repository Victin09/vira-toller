import { Route, Routes } from 'react-router-dom'

import './app.css'
import { ProtectedRoute } from './common/router/private.route'
import { AppLayout } from './components/layouts/app-layout'
import { HomeLayout } from './components/layouts/landing-layout'
import Welcome from './views/welcome'
import Login from './views/login'
import Register from './views/register'
import Home from './views/home'
import { PublicRoute } from './common/router/public.route'
import { AuthProvider } from './common/providers/auth.provider'

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<HomeLayout />}>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
