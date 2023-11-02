import { ReactNode, FC } from "react";

import { Nav, Footer } from '@/components';

interface LayoutProps {
  children?: ReactNode
}


export const Layout: FC<LayoutProps> = (props): ReactNode => (
  <div className="grid grid-rows-[auto_1fr_auto] h-screen">
    <Nav />
    <main>
      {props.children}
    </main>
    <Footer/>
  </div>
)