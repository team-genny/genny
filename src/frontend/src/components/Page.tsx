import { useState } from "react"
import clsx from "clsx"
import "./Page.css"
import Sidebar from "./Sidebar"
import IconButton from "./IconButton"
import { faBars } from "@fortawesome/free-solid-svg-icons"
interface PageProps {
  className?: string
  children: React.ReactNode
}




export default function Page({ className, children }: PageProps) {



  const [hideNavBar, setHideNavBar]=useState (false)

    
  function handleClick(){
    setHideNavBar(!hideNavBar)
  }

  return (
    <>
      {!hideNavBar && <Sidebar/>}
      <main className={clsx("page", className)}>
        {children}
      </main>
      <div className="navbar-ShowHide">
      {hideNavBar
        ? <IconButton icon={faBars} onClick={handleClick} />
        : <IconButton icon={faBars} onClick={handleClick} />
      }
      </div>
    </>
  )}