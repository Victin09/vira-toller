import { Outlet } from 'react-router-dom'
import { useAuth } from '../../common/providers/auth.provider'
import { Navbar } from '../navbar'

export const AppLayout = () => {
  const { getUser } = useAuth()

  return (
    <>
      <Navbar />
      <div id="offcanvas" data-vds-offcanvas="mode: slide">
        <div className="vds-offcanvas-bar">
          <h3>vira.TOLLER</h3>

          <ul className="vds-nav-default vds-nav-parent-icon" data-vds-nav>
            <li className="vds-parent">
              <a href="#">Workspaces</a>
              <ul className="vds-nav-sub">
                <li>
                  <a href="#">Add workspace</a>
                </li>
                <li>
                  <a href="#">View workspaces</a>
                </li>
              </ul>
            </li>
            <li className="vds-parent">
              <a href="#">Boards</a>
              <ul className="vds-nav-sub">
                <li>
                  <a href="#">Add board</a>
                </li>
                <li>
                  <a href="#">View boards</a>
                </li>
              </ul>
            </li>
            <li className="vds-parent">
              <a href="#">{getUser()!.fullname.toUpperCase()}</a>
              <ul className="vds-nav-sub">
                <li>
                  <a href="#">View profile</a>
                </li>
                <li>
                  <a href="#">Logout</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="vds-margin vds-margin-left vds-grid-row-medium"
        data-vds-grid
      >
        <Outlet />
      </div>
    </>
  )
}
