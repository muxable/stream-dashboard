import React, { useContext, useState, useEffect } from "react";
// import firebase from "firebase/app";
import { auth } from "../firebaseSetup";
import { User as FirebaseAuthUser } from "firebase/auth";
import { getAuth, createUserWithEmailAndPassword, UserCredential } from "firebase/auth";


type User = FirebaseAuthUser | null;
interface ValuesProps{
  currentUser: User,
  signup: (email: string, password: string) => Promise<UserCredential>
}

export const AuthContext = React.createContext<FirebaseAuthUser | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const [currentUser, setCurrentUser] = useState<User>(null);

  async function signup(email:string,password:string):Promise<UserCredential>{
    const signupAuth = getAuth();
    const signupAccount = await createUserWithEmailAndPassword(signupAuth, email, password)

    return signupAccount
  }

  auth.onAuthStateChanged((user) => {
    setCurrentUser(user);
  });

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((firebaseUser) => {
      setCurrentUser(firebaseUser);
    });
    return unsubcribe;
  }, []);

  const values:ValuesProps = {
    currentUser,
    signup
  }
  
  return (
    <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  );
}
