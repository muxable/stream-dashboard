import React, {useContext, useState, useEffect} from 'react'
import firebase from "firebase/app"
import {auth} from '../firebaseSetup'



// export const AuthContext = React.createContext(null)
export const AuthContext = React.createContext({user:null})

export function useAuth(){
  return useContext(AuthContext)
}

export function AuthProvider({children}:{children:any}){
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)


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