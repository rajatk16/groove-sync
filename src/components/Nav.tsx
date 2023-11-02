import { Link, useLocation } from "wouter";
import { ReactNode, FC } from "react";

import { useAuth } from "@/hooks";
import { Button, Container } from '@/components';

export const Nav: FC = (): ReactNode => {
  const { session, logOut } = useAuth();
  const [, navigate] = useLocation()
  
  const handleClick = async () => {
    await logOut();
    navigate('/')
  }
  
  return (
    <nav>
      <Container className="py-5">
        <p className="mb-2">
          <Link href="/" className="flex justify-between items-center mb-10">
            <a className="text-4xl font-bold textslate-900 dark:text-white hover:text-slate-900 dark:hover:text-gray-100 drop-shadow-[0_2px_0px_rgba(255, 255, 255, 1)] dark:drop-shadow-[0_2px_0px_rgba(0,0,0,1)]">GrooveSync</a>
            <p className="flex gap-4">
              {session ? (
                <Button color="red" className="font-medium cursor-pointer" onClick={handleClick}>Log Out</Button>
              ) : (
                <Link href="/login">
                  <Button color="blue">
                    <a className="font-medium text-inherit">Log In</a>
                  </Button>
                </Link>
              )}
            </p>
          </Link>
        </p>
      </Container>
    </nav>
  )
}