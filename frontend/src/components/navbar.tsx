/* eslint-disable multiline-ternary */
import { Link } from 'react-router-dom'
import { useAuth } from '../common/providers/auth.provider'

export const Navbar = () => {
  const { getUser } = useAuth()

  return (
    <div
      data-vds-sticky="media: 960"
      className="vds-navbar-container vds-sticky"
    >
      <nav className="vds-navbar-container" data-vds-navbar>
        <div className="vds-navbar-left">
          <a className="vds-navbar-item vds-logo" href="#">
            vira.TOLLER
          </a>
          <ul className="vds-navbar-nav vds-visible@m">
            <li>
              <a href="#">Workspaces</a>
              <div
                className="vds-navbar-dropdown"
                data-vds-dropdown="mode: click; offset: 0"
              >
                <ul className="vds-nav vds-navbar-dropdown-nav">
                  <li className="vds-active">
                    <Link to={`/workspaces/${getUser()!._id}`}>
                      View Workspaces
                    </Link>
                  </li>
                  <li>
                    <Link to="/workspaces/new">Create workspace</Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="#">Boards</a>
              <div
                className="vds-navbar-dropdown"
                data-vds-dropdown="mode: click; offset: 0"
              >
                <ul className="vds-nav vds-navbar-dropdown-nav">
                  <li className="vds-active">
                    <Link to={`/boards/${getUser()!._id}`}>View Boards</Link>
                  </li>
                  <li>
                    <Link to="/boards/new">Create board</Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <div className="vds-navbar-right">
          <a
            data-vds-navbar-toggle-icon=""
            href="#offcanvas"
            data-vds-toggle=""
            className="vds-navbar-toggle vds-hidden@m vds-icon vds-navbar-toggle-icon"
            aria-expanded="false"
          ></a>
          <ul className="vds-navbar-nav vds-visible@m">
            <li>
              <a href="#">{getUser()!.fullname}</a>
              <div
                className="vds-navbar-dropdown vds-border-rounded vds-box-shadow-small"
                data-vds-dropdown="mode: click; offset: 0"
                style={{ top: '0px !important' }}
              >
                <ul className="vds-nav vds-navbar-dropdown-nav">
                  <li>
                    <Link to="#">View profile</Link>
                  </li>
                  <li>
                    <Link to="/logout">Logout</Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
