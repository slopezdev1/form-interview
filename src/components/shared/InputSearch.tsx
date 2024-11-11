// React
import React, { useEffect, useRef, useState } from 'react';

// Interfaces
import { IKeyValue } from '../../interfaces/valueForm.interface';

// Utils resources
import { getItems } from '../../utils/formatterItems';

interface InputSearchProps {
  results: any[];
  label: string;
  placeholder?: string;
  keyInput?: string,
  disabled?: boolean,
  value: string,
  isFetching?: boolean,
  handleChangeInput?: (value: IKeyValue) => void
}

const InputSearch: React.FC<InputSearchProps> = ({ results, label, disabled, handleChangeInput, isFetching, value }) => {
  // states
  const [textSearch, setTextSearch] = useState<string>(value)
  const [filteredItems, setFilteredItems] = useState<IKeyValue[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  // Ref element
  const dropdownRef = useRef<HTMLDivElement>(null);

  const items = getItems(results);

  // Effects
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTextSearch(value);

    if (value) {
      const results = items.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(results);
      setIsOpen(true);
    } else {
      setFilteredItems([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (item: IKeyValue) => {
    setTextSearch(item.name);
    handleChangeInput!(item)
    setIsOpen(false);
  };

  const handleBlur = () => {
    setIsTouched(true);
  };


  return (
    <div ref={dropdownRef} className="relative h-full w-full flex flex-col gap-1">
      <label className='text-light text-sm' htmlFor="">{label}</label>
      <input
        required
        type="text"
        value={textSearch}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className="p-1 rounded w-full"
        disabled={disabled || isFetching}
        placeholder={isFetching ? 'Buscando...' : ''}
      />
      {isTouched && !textSearch && (
        <div className="text-red-500 text-sm">Este campo es obligatorio.</div>
      )}
      {isOpen && !isFetching && filteredItems.length > 0 && (
        <ul className="absolute w-full mt-14 border border-gray-300 rounded shadow-md bg-white max-h-40 overflow-y-auto z-10">
          {filteredItems.map(item => (
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