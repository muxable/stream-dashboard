import React, { useContext, useState, useEffect, createContext } from "react";
// import firebase from "firebase/app";
import { auth } from "../firebaseSetup";
import { User as FirebaseAuthUser } from "firebase/auth";
// import { getAuth, createUserWithEmailAndPassword, UserCredential } from "firebase/auth";


type User = FirebaseAuthUser | null;

export const AuthContext = createContext<FirebaseAuthUser | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const [currentUser, setCurrentUser] = useState<User>(null);

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((firebaseUser) => {
      setCurrentUser(firebaseUser);
    });
    return unsubcribe;
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
}
