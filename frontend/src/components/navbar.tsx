import { useEffect } from 'react'
import { MdDarkMode, MdMenu } from 'react-icons/md'
import { useLocation } from 'react-router-dom'
import vds from 'vira-design-system'

export const Navbar = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    console.log('pathname', pathname)
  }, [pathname])

  const changeTheme = () => {
    vds.toggleDarkMode()
  }

  return (
    <nav className="navbar">
      {/* Navbar text */}
      <span className="navbar-text ml-5">
        <span className="text-monospace">vira.Toller</span>
      </span>
      {/* Navbar nav */}
      {/* Navbar contents */}
      <ul className="navbar-nav ml-auto hidden-sm-and-down">
        <li className="nav-item">
          <a className="nav-link">Iniciar sesión</a>
        </li>
        <li className="nav-item">
          <a className="nav-link">Registrarse</a>
        </li>
        <li className="nav-item" onClick={() => changeTheme()}>
          <a className="nav-link">
            <MdDarkMode />
          </a>
        </li>
      </ul>
      <div className="navbar-content ml-auto hidden-md-and-up">
        <div className="dropdown with-arrow">
          <button
            className="btn navbar-menu-btn"
            data-toggle="dropdown"
            type="button"
            id="navbar-dropdown-toggle-btn-1"
          >
            <MdMenu />
          </button>
          <div
            className="dropdown-menu dropdown-menu-right w-200"
            aria-labelledby="navbar-dropdown-toggle-btn-1"
          >
            <a className="dropdown-item nav-link">Iniciar sesión</a>
            <a className="dropdown-item nav-link">Registrarse</a>
            <div className="dropdown-divider" />
            <a className="dropdown-item nav-link" onClick={() => changeTheme()}>
              Cambiar tema
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
