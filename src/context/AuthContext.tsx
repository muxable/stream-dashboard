import { User as FirebaseAuthUser } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseSetup";

type User = FirebaseAuthUser | null;

export const AuthContext = createContext<FirebaseAuthUser | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const [currentUser, setCurrentUser] = useState<User>(null);

  useEffect(() => {
    // Observer to check if user is changed/validated with setCurrentUser callback
    // Returns unsubscribe object, may need to adjust this logic in future to be more explicit
    auth.onAuthStateChanged(setCurrentUser);
  }, []);

  // Use context to track what is our user in app
  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
}
