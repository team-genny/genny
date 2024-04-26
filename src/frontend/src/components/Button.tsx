import clsx from "clsx"
import "./Button.css"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"

type ButtonProps = {
  variant?: "primary" | "secondary" | "danger",
  size?: "sm" | "md" | "lg",
  icon?: IconDefinition,
  className?: string,
  children: React.ReactNode,
  disabled?: boolean;
} & ({ onClick: () => void } | { href: string })

function hasHref(props: unknown): props is { href: string } {
  // @ts-expect-error props might not have "href" - that's what we're checking for
  return typeof props["href"] === "string"
}

function hasOnClick(props: unknown): props is { onClick: () => void } {
  // @ts-expect-error props might not have "href" - that's what we're checking for
  return typeof props["onClick"] === "function"
}

export default function Button({ variant, size, icon, children, className, ...rest }: ButtonProps) {
  variant ??= "primary"
  size ??= "md"

  const isLink = hasHref(rest)
  const isBtn = hasOnClick(rest)

  const innards = (
    <>
      {icon && <FontAwesomeIcon icon={icon} />}
      {children}
    </>
  )

  const btnClasses = clsx("btn", `btn-${variant}`, `btn-${size}`, { "btn-icon": icon }, className)

  if (isLink) return <LinkButton className={btnClasses} href={rest.href}>{innards}</LinkButton>
  if (isBtn) return <EventButton className={btnClasses} onClick={rest.onClick}>{innards}</EventButton>
  throw new Error("Button must have either `href` or `onClick`")
}

interface LinkButtonProps {
  href: string
  className: string
  children: React.ReactNode
  disabled?: boolean
}

function LinkButton({ href, className, children }: LinkButtonProps) {
  return (
    <NavLink className={clsx("btn-link", className)} to={href}>
      {children}
    </NavLink>
  )
}

interface EventButtonProps {
  onClick: () => void
  className: string
  children: React.ReactNode
  disabled?: boolean
}

function EventButton({ onClick, className, children }: EventButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}
