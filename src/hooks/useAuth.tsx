import { Models } from "appwrite";
import { useContext, useState, useEffect } from "react";

import { AuthContext } from "@/context";
import { GrooveSyncAuthContext } from "@/types";
import { deleteSession, getSession, login, loginConfirm, getTeams } from "@/lib";

export const useAuth = (): GrooveSyncAuthContext => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('useAuth cannot be used outside of Auth Context')
  }

  return auth;
}

export const useAuthState = () => {
  const [session, setSession] = useState<Models.Session>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    (async function run() {
      const session = await getSession()
      setSession(session);


    })()
  }, []);

  useEffect(() => {
    if (!session?.$id) return;
    (async function run() {
      const teams = await getTeams();
      const isAdmin = !!teams.find(team => team.$id === import.meta.env.VITE_APPWRITE_ADMIN_TEAMS_ID)
      setIsAdmin(isAdmin);
      
    })()
  }, [session?.$id])

  const logOut = async () => {
    await deleteSession();
    setSession(undefined);
  }

  const loginConfirmAndSaveSession = async (userId: string, secret: string) => {
    const res = await loginConfirm(userId, secret);
    setSession(res);
  }

  return {
    session,
    isAdmin,
    login,
    logOut,
    loginConfirmAndSaveSession,
  }
}