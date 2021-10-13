import React, { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../firebaseSetup";
import { User as FirebaseAuthUser } from "firebase/auth";

type User = FirebaseAuthUser | null;

export const AuthContext = createContext<FirebaseAuthUser | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const [currentUser, setCurrentUser] = useState<User>(null);

  useEffect(() => {
    // Observer to check if user is changed/validated
    auth.onAuthStateChanged(setCurrentUser);
  }, []);

  // Use context to track what is our user in app
  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
}
