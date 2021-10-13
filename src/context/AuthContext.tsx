import { User as FirebaseAuthUser } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebaseSetup";

type User = FirebaseAuthUser | null;

export const AuthContext = React.createContext<FirebaseAuthUser | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const [currentUser, setCurrentUser] = useState<User>(null);

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
}
