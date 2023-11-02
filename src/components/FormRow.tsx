import { FC, ReactNode } from 'react';

interface FormRowProps {
  children?: ReactNode;
  className?: string;
}

export const FormRow: FC<FormRowProps> = ({ children, className = '' }): ReactNode => (
  <div className={className}>
    {children}
  </div>
)