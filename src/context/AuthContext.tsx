import { User as FirebaseAuthUser, onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseSetup";

type User = FirebaseAuthUser | null;

export const AuthContext = createContext<FirebaseAuthUser | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const [currentUser, setCurrentUser] = useState<User>(null);
  // const [error, setError] = useState<any>(null);

  useEffect(() => {
    // Observer to check if user is changed/validated with setCurrentUser callback
    // Returns unsubscribe object, may need to adjust this logic in future to be more explicit
    // auth.onAuthStateChanged(setCurrentUser);

    const unsubscribe = onAuthStateChanged(auth, setCurrentUser);
    return () => unsubscribe();
  }, []);

  // Use context to track what is our user in app
  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
}

export const useAuthState = () => {
  const authValues = useContext(AuthContext)
  return { ...authValues, isAuthenticated: authValues != null }
}