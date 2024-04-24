import clsx from "clsx";
import "./InputGroup.css"

interface InputGroup {
  className?: string
  children: React.ReactNode
}

export default function InputGroup({ children, className }: InputGroup) {
  return (
    <div className={clsx("input-group", className)}>
      {children}
    </div>
  )
}
