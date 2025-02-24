"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { getItems } from "../../utils/formatterItems"
import type { IKeyValue } from "../../interfaces/valueForm.interface"
import { useTranslation } from "react-i18next"

interface InputSearchProps {
  results: IKeyValue[]
  label: string
  name: string
  value: string
  disabled?: boolean
  isFetching?: boolean
  error?: string,
  onSetValue: (value: string) => void
}

const InputSearch: React.FC<InputSearchProps> = (props: InputSearchProps) => {
  const { t } = useTranslation()
  const [filteredItems, setFilteredItems] = useState<IKeyValue[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [textSearch, setTextSearch] = useState<string>(props.value)

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const items = getItems(props.results)
    if (items) setFilteredItems(items)
  }, [props.results])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTextSearch(value)

    if (value) {
      const results = filteredItems.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
      setFilteredItems(results)
      setIsOpen(true)
    } else {
      setFilteredItems([])
      setIsOpen(false)
    }
  }

  const handleSelect = (item: IKeyValue) => {
    setTextSearch(item.name)
    setIsOpen(false)
    props.onSetValue(item.name)
  }

  return (
    <div ref={dropdownRef} className={"space-y-1.5"}>
      <label className={"text-sm font-medium text-orange-800 block"} htmlFor={props.name}>
        {props.label}
      </label>
      <div className="relative">
        <input
          type="text"
          id={props.name}
          value={textSearch}
          onChange={handleInputChange}
          className={`w-full px-3.5 py-2.5 border-2 border-orange-200 rounded-lg bg-white/60 ${props.error
            ? "border-red-300 focus:border-red-500 focus:ring-red-200"
            : "border-orange-200 focus:border-orange-500 focus:ring-orange-200"
            } ${props.disabled || props.isFetching ? "bg-orange-50/50 cursor-not-allowed" : ""}`}
          disabled={props.disabled || props.isFetching}
          placeholder={props.isFetching ? t("search") : ''}
        />

        {props.isFetching && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {props.error && <div className="text-sm text-red-500 mt-1 animate-fadeIn">{props.error}</div>}

        {isOpen && !props.isFetching && filteredItems.length > 0 && (
          <ul className="absolute w-full mt-1 border border-orange-200 rounded-lg shadow-lg bg-white/90 backdrop-blur-sm max-h-48 overflow-y-auto z-10 animate-fadeIn">
            {filteredItems.map((item) => (
              <li
                key={item.name}
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

