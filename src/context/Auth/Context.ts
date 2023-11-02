import { createContext } from "react";

import { GrooveSyncAuthContext } from "@/types";

export const AuthContext = createContext<GrooveSyncAuthContext | undefined>(undefined);