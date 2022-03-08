import { MdDarkMode } from 'react-icons/md'
import { Link, Outlet } from 'react-router-dom'
import vds from 'vira-design-system'

export const HomeLayout = () => {
  const switchTheme = () => {
    vds.toggleDarkMode()
  }

  return (
    <div className="page-wrapper with-navbar">
      <nav
        className="navbar"
        style={{ backgroundColor: 'transparent', border: 'none' }}
      >
        <div className="container-fluid">
          <div className="navbar-brand text-monospace">
            <Link to="/">vira.Toller</Link>
          </div>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/sign-in">
                Iniciar sesión
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sign-up">
                Registrarse
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => switchTheme()}>
                <MdDarkMode />
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="content-wrapper">
        <Outlet />
      </div>
    </div>
  )
}
