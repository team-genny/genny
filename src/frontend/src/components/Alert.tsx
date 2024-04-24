import clsx from "clsx"
import "./Alert.css"

interface AlertProps {
  variant?: "primary" | "secondary" | "info" | "success" | "warning" | "danger"
  children: React.ReactNode
}

export default function Alert({ variant, children }: AlertProps) {
  variant ??= "primary"

  return (
    <div
      className={clsx("alert", `alert-${variant}`)}
    >
      {children}
    </div>
  )
}
