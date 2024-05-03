import clsx from "clsx"
import InputGroup from "./InputGroup"
import "./TextInput.css"

interface TextInputProps {
  id: string
  label: string
  className?: string
  value?: string
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void
  disabled?: boolean
  name?: string
}

export default function TextInput({ id, label, className, value, onChange, name, disabled }: TextInputProps) {
  return (
    <InputGroup className={clsx("input-group-text", className)}>
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} placeholder={label} value={value} onChange={onChange} name={name} disabled={disabled} />
    </InputGroup>
  )
}
