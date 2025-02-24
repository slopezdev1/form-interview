import type React from "react"
import type { FieldError, UseFormRegisterReturn } from "react-hook-form"

interface InputGroupProps {
  keyInput: string
  label: string
  typeInput: string
  control?: UseFormRegisterReturn
  error?: FieldError
  className?: string
  labelClassName?: string
  inputClassName?: string
}

const InputGroup: React.FC<InputGroupProps> = ({
  keyInput,
  label,
  typeInput,
  control,
  error,
  className = "space-y-1.5",
  labelClassName = "text-sm font-medium text-orange-800 block",
  inputClassName = "w-full px-3.5 py-2.5 border-2 border-orange-200 rounded-lg bg-white/60 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors placeholder:text-orange-300",
}) => {
  return (
    <div className={className}>
      <label htmlFor={keyInput} className={labelClassName}>
        {label}
      </label>
      <input
        id={keyInput}
        type={typeInput}
        className={`${inputClassName} ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-200"
            : "border-orange-200 focus:border-orange-500 focus:ring-orange-200"
        }`}
        {...control}
      />
      {error && <div className="text-sm text-red-500 mt-1 animate-fadeIn">{error.message}</div>}
    </div>
  )
}

export default InputGroup

