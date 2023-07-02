import {
  Control,
  Controller,
  FieldErrorsImpl,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import TextInput, { TextInputProps } from './TextInput';

type OmitTextInputProps = Omit<
  TextInputProps,
  'name' | 'error' | 'value' | 'onChange' | 'onBlur' | 'ref'
> & {
  subText?: string;
  isNumber?: boolean;
};

export interface IControlledTextInput<TFieldValues extends FieldValues>
  extends OmitTextInputProps {
  errors?: Partial<FieldErrorsImpl<TFieldValues>>;
  control: Control<TFieldValues, any>;
  name: Path<TFieldValues>;
  rules?: Omit<
    RegisterOptions<TFieldValues, Path<TFieldValues>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}

const ControlledTextInput = <TFormValue extends FieldValues>({
  control,
  name,
  label,
  type,
  rules,
  ...rest
}: IControlledTextInput<TFormValue>) => {
  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({
        field: { onChange, ref, ...fields },
        fieldState: { error },
      }) => (
        <TextInput
          label={label}
          onChange={onChange}
          error={error?.message}
          type={type}
          {...rest}
          {...fields}
        />
      )}
    />
  );
};

export default ControlledTextInput;
