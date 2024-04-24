import clsx from "clsx"
import "./Page.css"

interface PageProps {
  className?: string
  children: React.ReactNode
}

export default function Page({ className, children }: PageProps) {
  return (
    <main className={clsx("page", className)}>
      {children}
    </main>
  )
}
