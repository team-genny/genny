import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import clsx, { ClassValue } from "clsx"
import "./IconButton.css"

interface IconButtonProps {
  variant?: "default" | "primary" | "secondary" | "info" | "success" | "warning" | "danger"
  onClick: () => void
  icon: IconDefinition,
  className?: ClassValue
}

export default function IconButton({ icon, onClick, className, variant }: IconButtonProps) {
  return (
    <button onClick={onClick} className={clsx("icon-button", `icon-button-${variant}`, className)}>
      <FontAwesomeIcon icon={icon} />
    </button>
  )
}
