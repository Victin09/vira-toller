/* eslint-disable multiline-ternary */
import { useEffect } from 'react'
import { MdDarkMode } from 'react-icons/md'
import { FiMenu } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'
import vds from 'vira-design-system'
import { useAuth } from '../common/hooks/useAuth'

export const Navbar = () => {
  const { pathname } = useLocation()
  const { isLoggedIn, user } = useAuth()

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
      {/* Navbar text */}
      <span className="navbar-text ml-5">
        <span className="text-monospace">vira.Toller</span>
      </span>
      {/* Navbar nav */}
      {/* Navbar contents */}
      {isLoggedIn() ? (
        <ul className="navbar-nav hidden-sm-and-down">
          <li className="nav-item">
            <a className="nav-link">Espacios de trabajo</a>
          </li>
          <li className="nav-item dropdown with-arrow">
            <a
              className="nav-link text-primary"
              data-toggle="dropdown"
              id="nav-link-dropdown-toggle"
            >
              Crear
              <i className="fa fa-angle-down ml-5" aria-hidden="true"></i>
            </a>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="nav-link-dropdown-toggle"
            >
              <a href="#" className="dropdown-item">
                Tablero
              </a>
              <a href="#" className="dropdown-item">
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
