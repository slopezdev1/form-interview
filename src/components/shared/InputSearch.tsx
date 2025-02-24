"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { getItems } from "../../utils/formatterItems"
import type { FieldError, UseFormSetValue } from "react-hook-form"
import type { IKeyValue } from "../../interfaces/valueForm.interface"

interface InputSearchProps {
  results: any[]
  label: string
  placeholder?: string
  name: string
  defaultValue: string
  disabled?: boolean
  isFetching?: boolean
  setValue: UseFormSetValue<any>
  error?: FieldError
  className?: string
  labelClassName?: string
  inputClassName?: string
}

const InputSearch: React.FC<InputSearchProps> = ({
  results,
  label,
  placeholder,
  name,
  defaultValue,
  disabled,
  isFetching,
  setValue,
  error,
  className = "space-y-1.5 relative",
  labelClassName = "text-sm font-medium text-orange-800 block",
  inputClassName = "w-full px-3.5 py-2.5 border-2 border-orange-200 rounded-lg bg-white/60 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors placeholder:text-orange-300",
}) => {
  const [filteredItems, setFilteredItems] = useState<IKeyValue[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [textSearch, setTextSearch] = useState<string>(defaultValue)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const items = getItems(results)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTextSearch(value)

    if (value) {
      const results = items.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
      setFilteredItems(results)
      setIsOpen(true)
    } else {
      setFilteredItems([])
      setIsOpen(false)
    }
  }

  const handleSelect = (item: IKeyValue) => {
    if (setValue) {
      setValue(name, { id: item.id, name: item.name })
      setTextSearch(item.name)
    }
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} className={className}>
      <label className={labelClassName} htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          id={name}
          value={textSearch}
          onChange={handleInputChange}
          className={`${inputClassName} ${error
              ? "border-red-300 focus:border-red-500 focus:ring-red-200"
              : "border-orange-200 focus:border-orange-500 focus:ring-orange-200"
            } ${disabled || isFetching ? "bg-orange-50/50 cursor-not-allowed" : ""}`}
          disabled={disabled || isFetching}
          placeholder={isFetching ? "Buscando..." : placeholder}
        />

        {isFetching && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && <div className="text-sm text-red-500 mt-1 animate-fadeIn">{error.message}</div>}

        {isOpen && !isFetching && filteredItems.length > 0 && (
          <ul className="absolute w-full mt-1 border border-orange-200 rounded-lg shadow-lg bg-white/90 backdrop-blur-sm max-h-48 overflow-y-auto z-10 animate-fadeIn">
            {filteredItems.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelect(item)}
                className="px-4 py-2.5 hover:bg-orange-50 cursor-pointer transition-colors text-orange-900"
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default InputSearch

