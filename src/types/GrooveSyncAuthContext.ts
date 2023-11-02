import { Models } from "appwrite";

export interface GrooveSyncAuthContext {
  session?: Models.Session; 
  isAdmin: boolean;
  login: (email: string) => Promise<Models.Token>;
  loginConfirmAndSaveSession: (userId: string, secret: string) => Promise<void>;
  logOut: () => Promise<void>;
}