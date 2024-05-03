import { useState } from "react"
import clsx from "clsx"
import "./Page.css"
import { useEffect } from "react"
import Sidebar from "./Sidebar"
import IconButton from "./IconButton"
import { faBars } from "@fortawesome/free-solid-svg-icons"

interface PageProps {
  className?: string
  children: React.ReactNode
}

export default function Page({ className, children }: PageProps) {

const [hideNavBar, setHideNavBar] = useState(false)
//use effect to ensure only run once on startup and not running infinite times
useEffect(() => {if (window.innerWidth<1023){
  setHideNavBar(true)
}},[])
// changes HideNavBar to the other boolean
  function handleClick() {
    setHideNavBar(!hideNavBar)
  }

  return (
    <>
      {!hideNavBar && <Sidebar/>}
      <main className={clsx("page", className)}>
        {children}
      </main>
      <div className="navbar-ShowHide">
      <IconButton icon={faBars} onClick={handleClick} variant="primary" />
      </div>
    </>
  )}
