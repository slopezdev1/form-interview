import type React from "react"

interface InputGroupProps {
  name: string
  label: string
  typeInput: string
  error?: string,
  value: string,
  onSetValue: (value: string) => void
}

const InputGroup: React.FC<InputGroupProps> = (props: InputGroupProps) => {

  const handleChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    props.onSetValue(event.currentTarget.value);
  }
  
  return (
    <div className={"space-y-1.5"}>
      <label htmlFor={props.name} className={"text-sm font-medium text-orange-800 block"}>
        {props.label}
      </label>
      <input
        onKeyUp={handleChange}
        defaultValue={props.value}
        id={props.name}
        type={props.typeInput}
        className={`w-full px-3.5 py-2.5 border-2 border-orange-200 rounded-lg bg-white/60 ${props.error
          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
          : "border-orange-200 focus:border-orange-500 focus:ring-orange-200"
          }`}
      />
      {props.error && <div className="text-sm text-red-500 mt-1 animate-fadeIn">{props.error}</div>}
    </div>
  )
}

export default InputGroup

