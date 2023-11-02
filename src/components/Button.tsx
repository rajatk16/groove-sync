import { FC, MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  color?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button: FC<ButtonProps> = ({ children, className = '', color = 'slate', onClick }): ReactNode => {
  let buttonColor = 'text-white bg-slate-600 hover:bg-slate-500 dark:bg-slate-500 dark:hover:bg-slate-400';

  if (color === 'red') {
    buttonColor = 'text-white bg-red-600 hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-400'
  }

  if (color === 'blue') {
    buttonColor = 'text-white bg-blue-600 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400'
  }

  if (color === 'green') {
    buttonColor = 'text-white bg-green-600 hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-400'
  }

  return (
    <button onClick={onClick} className={`inline-block rounded py-1.5 px-6 text-sm font-bold uppercase ${buttonColor} ${className}`}>
      {children}
    </button>
  )
}