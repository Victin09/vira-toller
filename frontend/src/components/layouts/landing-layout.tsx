import { MdDarkMode } from 'react-icons/md'
import { Link, Outlet } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import vds from 'vira-design-system'

export const HomeLayout = () => {
  const switchTheme = () => {
    vds.toggleDarkMode()
  }

  const switchSidebar = () => {
    vds.toggleSidebar()
  }

  return (
    <div
      className="page-wrapper with-navbar with-sidebar"
      data-sidebar-type="overlayed-all"
      data-sidebar-hidden="hidden"
    >
      <div className="sidebar-overlay" onClick={() => switchSidebar()} />
      <nav
        className="navbar"
        style={{ backgroundColor: 'transparent', border: 'none' }}
      >
        <div className="container-fluid">
          <div className="navbar-brand text-monospace">
            <Link to="/">vira.Toller</Link>
          </div>
          <ul className="navbar-nav ml-auto hidden-sm-and-down">
            <li className="nav-item">
              <Link className="nav-link" to="/sign-in">
                Iniciar sesión
              </Link>
            </li>
            <Link
              className="d-none d-md-flex ml-auto btn btn-primary"
              type="button"
              to="/sign-up"
            >
              Sign up
            </Link>
            <li className="nav-item">
              <a className="nav-link" onClick={() => switchTheme()}>
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
        </div>
      </nav>
      <div className="sidebar">
        <div className="sidebar-menu">
          <Link to="/" className="sidebar-brand">
            {/* <img src="..." alt="..." /> */}
            vira.Toller
          </Link>
          <div className="sidebar-divider mt-20"></div>
          <Link to="/sign-in" className="sidebar-link">
            Sign in
          </Link>
          <Link to="/sign-up" className="sidebar-link">
            Register
          </Link>
          <br />
          <div className="sidebar-divider"></div>
          <a className="sidebar-link" onClick={() => switchTheme()}>
            <span className="sidebar-icon">
              <MdDarkMode />
            </span>
          </a>
        </div>
      </div>
      <div className="content-wrapper">
        <Outlet />
      </div>
    </div>
  )
}
