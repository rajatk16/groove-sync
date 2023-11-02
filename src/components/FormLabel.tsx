import { FC, ReactNode } from "react";

interface FormLabelProps {
  children?: ReactNode;
  className?: string;
  htmlFor?: string;
}

export const FormLabel: FC<FormLabelProps> = ({ children, className = '', htmlFor }): ReactNode => (
  <label
    htmlFor={htmlFor}
    className={`block text-sm font-bold mb-3 ${className}`}
  >
    {children}
  </label>
)