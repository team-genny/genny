import clsx from "clsx"
import InputGroup from "./InputGroup"
import "./TextInput.css"

interface TextInputProps {
  id: string
  label: string
  className?: string
  value?: string
  name?: string
  min?: number
  max?: number
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void
}

export default function NumberInput({ id, label, className, value, onChange, name, min, max }: TextInputProps) {
  return (
    <InputGroup className={clsx("input-group-text", className)}>
      <label htmlFor={id}>{label}</label>
      <input type="number" id={id} placeholder={label} value={value} onChange={onChange} name={name} min={min} max={max}/>
    </InputGroup>
  )
}
