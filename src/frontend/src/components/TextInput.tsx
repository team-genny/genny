import clsx from "clsx"
import InputGroup from "./InputGroup"
import "./TextInput.css"

interface TextInputProps {
  id: string
  label: string
  className?: string
  value?: string
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void
}

export default function TextInput({ id, label, className, value, onChange }: TextInputProps) {
  return (
    <InputGroup className={clsx("input-group-text", className)}>
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} placeholder={label} value={value} onChange={onChange} />
    </InputGroup>
  )
}
