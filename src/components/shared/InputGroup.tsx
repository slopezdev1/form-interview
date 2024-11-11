// React
import React, { ChangeEvent, FocusEvent, useState } from "react"


interface InputGroupProps {
  keyInput: string,
  label: string,
  typeInput: string
  handleChangeInput: (value: string) => void
}

const InputGroup: React.FC<InputGroupProps> = ({ keyInput, label, typeInput, handleChangeInput }) => {

  // states
  const [error, setError] = useState('');

  // handlers
  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setError(validateField(value));
  };
  const changeValueInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    handleChangeInput(event.target.value)
  }

  // Functions
  const validateField = (value: string) => {
    if (typeInput === 'email' && value) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(value) ? '' : 'Por favor, ingrese un correo electrónico válido.';
    }
    if (!value) {
      return 'Este campo es obligatorio.';
    }
    return '';
  };





  return (
    <>
      <div className="flex flex-col gap-1">
        <label htmlFor={keyInput} className="text-sm text-light">{label}</label>
        <input
          required
          onChange={changeValueInput}
          onBlur={handleBlur}
          id="{keyInput}"
          name="{keyInput}"
          type={typeInput}
          className="rounded p-1"
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
      </div>
    </>
  )
}

export default InputGroup