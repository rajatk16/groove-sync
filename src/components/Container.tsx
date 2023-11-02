import { FC, ReactNode } from "react";

interface ContainerProps {
  children?: ReactNode;
  className?: string
}

export const Container: FC<ContainerProps> = ({ children, className = '' }): ReactNode => {
  return (
    <div className={`w-full max-w-7xl my-0 mx-auto px-5 ${className}`}>
      {children}
    </div>
  )
}

export default Container;