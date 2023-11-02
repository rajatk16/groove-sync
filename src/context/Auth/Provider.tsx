import {AuthContext} from '@/context'
import { useAuthState } from '@/hooks/useAuth';
import { GrooveSyncAuthProviderProps } from "@/types";

export const AuthProvider = ({ children }: GrooveSyncAuthProviderProps) => {
  const auth = useAuthState();
  return (
    <AuthContext.Provider value={auth}>
      {children}  
    </AuthContext.Provider>
  )
}
