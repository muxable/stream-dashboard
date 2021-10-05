import React, {useContext, useState, useEffect} from 'react'
import firebase from "firebase/app"
import {auth} from '../firebaseSetup'
import { User as FirebaseAuthUser } from "firebase/auth";

// type User = firebase.User
type User = FirebaseAuthUser | null

// export const AuthContext = React.createContext(null)
export const AuthContext = React.createContext<FirebaseAuthUser|null>(null)

export function useAuth(){
  return useContext(AuthContext)
}

export function AuthProvider({children}:React.PropsWithChildren<{}>){
  const [currentUser, setCurrentUser] = useState<User>(null)


  // function signup(email,password){
  //   return auth.createUserWithEmailAndPassword(email,password)
  // }

  auth.onAuthStateChanged(user=> {
    setCurrentUser(user)
  })

  useEffect(()=>{
    const unsubcribe = auth.onAuthStateChanged(firebaseUser=>{
      setCurrentUser(firebaseUser)
    })
    return unsubcribe
    // auth.onAuthStateChanged(setCurrentUser)
  }, [])


  return(
    <AuthContext.Provider value={currentUser}>
      {children}
    </AuthContext.Provider>
  )
}