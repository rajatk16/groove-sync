import { ChangeEventHandler, FC, ReactNode } from "react";

interface InputFileProps {
  className?: string;
  id?: string;
  name?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  required?: boolean
}

export const InputFile: FC<InputFileProps> = ({ className, id, name, onChange, required }): ReactNode => (
  <input
    id={id}
    className={`block w-full border-slate-400 rounded focus:border-indigo-300 focus-ring focus:ring-indigo-200 focus:ring-opacity-50 ${className}`}
    type="file"
    name={name}
    onChange={onChange}
    required={required}
  />
);