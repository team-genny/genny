import { NavLink } from "react-router-dom"
import "./Sidebar.css"
import IconButton from "./IconButton"
import { faDice, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Sidebar() {
  return <nav className="sidebar">
    <SidebarHeading />
    <ul>
      <SidebarLink href="/">Dashboard</SidebarLink>
      <SidebarLink href="/schemas">Schemas</SidebarLink>
      <SidebarLink href="/data">Data</SidebarLink>
    </ul>
  </nav>
}

interface SidebarItemProps {
  children: React.ReactNode
}

function SidebarItem({ children }: SidebarItemProps) {
  return <li className="sidebar-item">
    {children}
  </li>
}

interface SidebarLinkProps {
  href: string
  children: React.ReactNode
}

function SidebarLink({ href, children }: SidebarLinkProps) {
  return <SidebarItem>
    <NavLink
      to={href}
      className={({ isActive, isPending }) => (
        "sidebar-link " +
          (isActive ? "active"
          : isPending ? "pending"
          : "")
      )}
    >
      {children}
    </NavLink>
  </SidebarItem>
}

function SidebarHeading() {
  return <header className="sidebar-heading">
    <FontAwesomeIcon icon={faDice} />
    <h1>Genny</h1>
    <IconButton className="menu-btn" icon={faEllipsisVertical} onClick={() => {}} />
  </header>
}
