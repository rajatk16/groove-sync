import { AppwriteException } from "appwrite";
import { FC, ReactNode, useEffect } from "react";

import { useAuth } from '@/hooks';
import { useLocation } from "wouter";
import { Container } from "@/components";

export const Session: FC = (): ReactNode => {
  const { loginConfirmAndSaveSession } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const userId = params.get('userId');
    const secret = params.get('secret');

    if (typeof userId === 'string' && typeof secret === 'string') {

      (async function run() {
        try {
          await loginConfirmAndSaveSession(userId, secret)
          navigate('/')  
        } catch (error: unknown) {
          if (error instanceof AppwriteException) {
            navigate(`/login?error=${error.type}`);
            return;
          }
        }
        
      })()
    } else {
      navigate('/login')
      return;
    }
  }, [navigate, loginConfirmAndSaveSession])
  return (
    <Container className="h-screen flex items-center justify-center text-center">
      <p>Logging you in...</p>
    </Container>
  )
}