import { ChangeEventHandler, FC, ReactNode } from 'react';

interface InputTextProps {
  className?: string;
  id?: string;
  name: string;
  type?: 'text' | 'email';
  required?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>
  value?: string | number | readonly string[]
}

export const InputText: FC<InputTextProps> = (props): ReactNode => (
  <input
    onChange={props.onChange}
    value={props.value}
    type={props.type}
    id={props.id}
    className={`block w-full text-slate-900 border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${props.className}`}
    name={props.name}
    required={props.required}
  />
)