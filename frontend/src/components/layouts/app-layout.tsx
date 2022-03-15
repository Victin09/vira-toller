import { Outlet } from 'react-router-dom'
import vds from 'vira-design-system'
import { Navbar } from '../navbar'

export const AppLayout = () => {
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
      <div className="sidebar">
        <div className="sidebar-menu">
          <a href="#" className="sidebar-brand">
            <img src="..." alt="..." />
            Brand
          </a>
          <div className="sidebar-content">
            <input type="text" className="form-control" placeholder="Search" />
            <div className="mt-10 font-size-12">
              Press <kbd>/</kbd> to focus
            </div>
          </div>
          <h5 className="sidebar-title">Getting started</h5>
          <div className="sidebar-divider"></div>
          <a href="#" className="sidebar-link active">
            Installation
          </a>
          <a href="#" className="sidebar-link">
            CLI commands
          </a>
          <br />
          <h5 className="sidebar-title">Components</h5>
          <div className="sidebar-divider"></div>
          <a href="#" className="sidebar-link">
            File explorer
          </a>
          <a href="#" className="sidebar-link">
            Spreadsheet
          </a>
          <a href="#" className="sidebar-link">
            Map
          </a>
          <a href="#" className="sidebar-link">
            Messenger
          </a>
        </div>
      </div>
      <Navbar />
      <div className="content-wrapper">
        <Outlet />
      </div>
    </div>
  )
}
