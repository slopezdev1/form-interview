// React
import React, { useEffect, useRef, useState } from "react";

// Utils resources
import { getItems } from "../../utils/formatterItems";

// Hook
import { FieldError, UseFormSetValue } from "react-hook-form";

// Interfaces
import { IKeyValue } from "../../interfaces/valueForm.interface";

interface InputSearchProps {
  results: any[];
  label: string;
  placeholder?: string;
  name: string;
  defaultValue: string,
  disabled?: boolean;
  isFetching?: boolean;
  setValue: UseFormSetValue<any>;
  error?: FieldError;
}

const InputSearch: React.FC<InputSearchProps> = (props) => {
  
  // states
  const [filteredItems, setFilteredItems] = useState<IKeyValue[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [textSearch, setTextSearch] = useState<string>(props.defaultValue);

  // Ref element
  const dropdownRef = useRef<HTMLDivElement>(null);

  const items = getItems(props.results);

  // Effects
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTextSearch(value)

    if (value) {
      const results = items.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
      setFilteredItems(results);
      setIsOpen(true);
    } else {
      setFilteredItems([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (item: IKeyValue) => {
    if (props.setValue) {
      props.setValue(props.name, { id: item.id, name: item.name });
      setTextSearch(item.name)
    }
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative h-full w-full flex flex-col gap-1">
      <label className="text-light text-sm" htmlFor={props.name}>
        {props.label}
      </label>
      <input
        type="text"
        value={textSearch}
        onChange={handleInputChange}
        className={`p-1 rounded w-full ${props.error ? 'border-red-500' : ''}`}
        disabled={props.disabled || props.isFetching}
        placeholder={props.isFetching ? "Buscando..." : ""}
      />
      {props.error && (
        <div className="text-red-500 text-sm">
          {props.error.message}
        </div>
      )}

      {isOpen && !props.isFetching && filteredItems.length > 0 && (
        <ul className="absolute w-full mt-14 border border-gray-300 rounded shadow-md bg-white max-h-40 overflow-y-auto z-10">
          {filteredItems.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputSearch;
