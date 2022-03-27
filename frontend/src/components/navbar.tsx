/* eslint-disable multiline-ternary */
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../common/providers/auth.provider'
import { generateInitials } from '../common/utils/generate-initials.util'
import { useFetch } from '../common/hooks/use-fetch'
import { Workspace } from '../models/workspace.model'

export const Navbar = () => {
  const { getUser } = useAuth()
  const { fetchData, data, error } = useFetch<Workspace[]>()

  useEffect(() => {
    if (getUser()) {
      fetchData(`http://localhost:3000/workspaces/user/${getUser()!._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
    }
  }, [])

  return (
    <div className="header header-fixed u-unselectable header-animated">
      <div className="header-brand">
        <div className="nav-item no-hover">
          <a>
            <h6 className="title">Vira.TOLLER</h6>
          </a>
        </div>
        <div className="nav-item nav-btn" id="header-btn">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="header-nav" id="header-menu">
        <div className="nav-left">
          <div className="nav-item text-center">
            <div className="nav-item has-sub toggle-hover">
              <a className="nav-dropdown-link">Espacios de trabajo</a>
              <ul className="dropdown-menu dropdown-animated" role="menu">
                {data && data.length > 0 ? (
                  data.map((workspace: Workspace) => (
                    <li key={workspace.name} role="menu-item">
                      <Link to={`/workspace/${workspace.name}`}>
                        {workspace.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li role="menu-item">
                    <Link to="/workspace/create">Crear espacio de trabajo</Link>
                  </li>
                )}
                <li className="u-color-opacity-70">
                  <small>
                    <a href="#basic-modal">Crear espacio de trabajo</a>
                  </small>
                </li>
              </ul>
            </div>
          </div>
          <div className="nav-item text-center">
            <div className="nav-item has-sub toggle-hover">
              <a className="nav-dropdown-link">Tableros</a>
              <ul className="dropdown-menu dropdown-animated" role="menu">
                <li role="menu-item">
                  <a>Profile</a>
                </li>
                <li role="menu-item">
                  <a>Messages</a>
                </li>
                <li role="menu-item">
                  <a>Log Out</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="nav-item text-center">
            <a href="#">
              <span className="icon">
                <i className="fab fa-wrapper fa-twitter" aria-hidden="true"></i>
              </span>
            </a>
          </div>
        </div>

        <div className="nav-right">
          <div className="nav-item has-sub toggle-hover">
            <div
              className="avatar avatar--sm text-gray-000"
              data-text={generateInitials(getUser()!.fullname)}
            />
            <ul className="dropdown-menu dropdown-animated" role="menu">
              <li role="menu-item">
                <a>Profile</a>
              </li>
              <li role="menu-item">
                <a>Messages</a>
              </li>
              <li role="menu-item">
                <a>Log Out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modals */}
      <div className="modal modal-animated--zoom-in" id="basic-modal">
        <a
          href="#searchModalDialog"
          className="modal-overlay close-btn"
          aria-label="Close"
        ></a>
        <div className="modal-content" role="document">
          <div className="modal-header">
            <a href="#components" className="u-pull-right" aria-label="Close">
              <span className="icon">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="times"
                  className="svg-inline--fa fa-times fa-w-11 fa-wrapper"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 352 512"
                >
                  <path
                    fill="currentColor"
                    d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                  ></path>
                </svg>
              </span>
            </a>
            <div className="modal-title">Invite</div>
          </div>
          <div className="modal-body"></div>
          <div className="modal-footer">
            <div className="form-section u-text-right">
              <a href="#components">
                <button className="btn btn--sm u-inline-block">Cancel</button>
              </a>
              <a href="#components">
                <button className="btn-info btn--sm u-inline-block">
                  Confirm
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
