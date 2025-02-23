//react
import React from "react";

//hook
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputGroupProps {
  keyInput: string;
  label: string;
  typeInput: string;
  control?: UseFormRegisterReturn;
  error?:  FieldError;
}

const InputGroup: React.FC<InputGroupProps> = ({ keyInput, label, typeInput, control, error }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={keyInput} className="text-sm">{label}</label>
      <input
        id={keyInput}
        type={typeInput}
        className={`bg-orange-200 rounded p-1 ${error ? "border border-red-500" : "border border-orange-500"}`}
        {...control}
      />
      {error && <div className="text-red-500 text-sm">{error.message}</div>}
    </div>
  );
};

export default InputGroup;
