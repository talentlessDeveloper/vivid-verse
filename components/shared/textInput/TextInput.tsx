import React, { ChangeEvent, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import RenderIf from '../renderIf';
import TextField from './SelectField';

type TextFieldChangeHandler =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLSelectElement>;

export type TextInputProps = {
  label: string;
  name: string;
  onChange?: (event: TextFieldChangeHandler) => void;
  type?: string;
  error?: string;
  placeholder?: string;
  isSelect?: boolean;
  selectItems?: { label: string; value: string }[];
};

const TextInput = ({
  label,
  name,
  onChange,
  error,
  type = 'text',
  placeholder,
  isSelect,
  selectItems,
}: //   selectItems,
TextInputProps) => {
  const [showPassword, setShowPassword] = useState(true);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-slate-900 text-sm font-dm font-bold mb-2"
      >
        {label}
      </label>
      <RenderIf condition={!isSelect}>
        <div className="relative">
          <input
            className=" appearance-none font-dm border rounded w-full py-2 px-3 text-slate-900 text-base leading-tight focus:outline-none focus:shadow-outline"
            id={name}
            name={name}
            type={
              showPassword && type === 'password'
                ? 'password'
                : !showPassword && type === 'password'
                ? 'text'
                : type
            }
            placeholder={placeholder}
            onChange={onChange}
          />
          <RenderIf condition={type === 'password'}>
            <button
              onClick={handleTogglePassword}
              className="absolute top-1/2 right-3 -translate-y-1/2"
              type="button"
            >
              {!showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </RenderIf>
        </div>
      </RenderIf>

      <RenderIf condition={!!isSelect}>
        <TextField
          variant="outlined"
          select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          selectItem={selectItems}
        />
      </RenderIf>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default TextInput;
