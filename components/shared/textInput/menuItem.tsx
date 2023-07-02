import { ReactNode } from 'react';

type MenuItemProps = {
  value: string;
  selected?: boolean;
  onSelect?: (value: string) => void;
  children: ReactNode;
};

function MenuItem({ value, selected, onSelect, children }: MenuItemProps) {
  const handleClick = () => {
    onSelect?.(value);
  };

  return (
    <li
      className={`px-4 py-2 text-sm ${
        selected ? 'bg-indigo-500 text-white' : ''
      }`}
      // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
      role="option"
      onClick={handleClick}
    >
      {children}
    </li>
  );
}

export default MenuItem;
