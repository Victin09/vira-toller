/* eslint-disable multiline-ternary */
import { useEffect, useState } from 'react'
import { MdDarkMode } from 'react-icons/md'
import { FiMenu } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'
import vds from 'vira-design-system'
import { useAuth } from '../common/providers/auth.provider'

export const Navbar = () => {
  const { pathname } = useLocation()
  const { user } = useAuth()
  const [createWorkspace, setCreateWorkspace] = useState(false)

  useEffect(() => {
    console.log('pathname', pathname)
  }, [pathname])

  const changeTheme = () => {
    vds.toggleDarkMode()
  }

  const switchSidebar = () => {
    console.log('Hago click')
    vds.toggleSidebar()
  }

  return (
    <nav className="navbar">
      {/* Navbar brand */}
      <div className="navbar-brand text-monospace">
        <Link to="/">vira.Toller</Link>
      </div>
      {/* Navbar nav */}
      {user ? (
        <ul className="navbar-nav hidden-sm-and-down">
          <li className="nav-item dropdown">
            <a
              className="nav-link"
              data-toggle="dropdown"
              id="nav-link-dropdown-toggle"
            >
              Espacios de trabajo
            </a>
            <div
              className="dropdown-menu dropdown-menu-center"
              aria-labelledby="nav-link-dropdown-toggle"
            >
              <a href="#" className="dropdown-item">
                API builder
              </a>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link"
              data-toggle="dropdown"
              id="nav-link-dropdown-toggle"
            >
              Crear
            </a>
            <div
              className="dropdown-menu dropdown-menu-center"
              aria-labelledby="nav-link-dropdown-toggle"
            >
              <a href="#create-workspace" className="dropdown-item">
                Tablero
              </a>
              <a href="#create-workspace" className="dropdown-item">
                Espacio de trabajo
              </a>
            </div>
          </li>
        </ul>
      ) : (
        <ul className="navbar-nav ml-auto hidden-sm-and-down">
          <li className="nav-item">
            <a className="nav-link">Iniciar sesión</a>
          </li>
          <li className="nav-item">
            <a className="nav-link">Registrarse</a>
          </li>
        </ul>
      )}
      <ul className="navbar-nav ml-auto hidden-sm-and-down">
        <li className="nav-item" onClick={() => changeTheme()}>
          <a className="nav-link">
            <MdDarkMode />
          </a>
        </li>
      </ul>
      <div className="navbar-content ml-auto hidden-md-and-up">
        <button
          className="btn btn-action navbar-menu-btn"
          type="button"
          id="navbar-dropdown-toggle-btn-1"
          onClick={() => switchSidebar()}
        >
          <FiMenu />
        </button>
      </div>
    </nav>
  )
}
