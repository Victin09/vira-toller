/* eslint-disable multiline-ternary */
import { Link } from 'react-router-dom'
import { useAuth } from '../common/providers/auth.provider'

export const Navbar = () => {
  const { getUser } = useAuth()

  return (
    <nav className="navbar sticky-top navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          vira.Toller
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-vds-toggle="collapse"
          data-vds-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {/* Workspaces */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-vds-toggle="dropdown"
                aria-expanded="false"
              >
                Espacios de trabajo
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Ver espacios de trabajo
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    data-vds-toggle="modal"
                    data-vds-target="#createWorkspaceModal"
                  >
                    Crear espacio de trabajo
                  </a>
                </li>
              </ul>
            </li>

            {/* Boards */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-vds-toggle="dropdown"
                aria-expanded="false"
              >
                Tableros
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item">Ver tableros</a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Crear tablero
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">{getUser()!.fullname.toUpperCase()}</li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
