import {
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  ReactNode,
  RefObject,
} from 'react';
import MenuItem from './menuItem';

interface OptionItem {
  value: string;
  label: string;
}

type TextFieldProps = {
  variant?: string;
  select?: boolean;
  className?: string;
  placeholder?: string;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  selectItem?: OptionItem[];
};

function TextField({
  variant,
  select,
  className,
  placeholder,
  name,
  onChange,
  selectItem,
}: TextFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const selectRef = useRef<HTMLSelectElement | null>(null);

  //   const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
  //     setSelectedValue(event.target.value);
  //     onChange?.(event);
  //   };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setIsOpen(!isOpen);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
      selectRef.current?.focus();
    }
  };

  const handleOptionSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    selectRef.current?.focus();
  };

  return (
    <div className="relative">
      <div
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer ${className}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={`${name}-label`}
        ref={selectRef as RefObject<HTMLDivElement>}
      >
        <div className="flex items-center justify-between">
          {selectedValue ? (
            <span>{selectedValue}</span>
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
          <svg
            className={`w-4 h-4 ml-2 transition-transform duration-200 transform ${
              isOpen ? 'rotate-180' : ''
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6.293 8.707a1 1 0 0 1 1.414 0L10 10.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {isOpen && (
          <ul
            className="mt-1 py-1 bg-white rounded-md shadow-lg max-h-40 overflow-auto focus:outline-none"
            role="listbox"
            aria-labelledby={`${name}-label`}
          >
            {selectItem?.map((item, idx) => (
              <MenuItem
                key={`menu-${idx}`}
                value={item.value}
                selected={item.value === selectedValue}
                onSelect={handleOptionSelect}
              >
                {item.label}
              </MenuItem>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TextField;
