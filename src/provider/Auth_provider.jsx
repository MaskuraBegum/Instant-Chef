import React, { createContext, useEffect, useState } from 'react';


import {  createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from '../firebase/firebase.config';
import { GoogleAuthProvider } from 'firebase/auth';
import { getIdTokenResult } from 'firebase/auth';


export const AuthContext = createContext(null);

const provider = new GoogleAuthProvider();

const Auth_provider = ({children}) => {
    const [user,setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false); // Track admin status
  const [loading, setLoading] = useState(true); 
    console.log(user);

    //create user
    const CreateUser = (email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
    };
    //SignIn user
    const signIn = (email,password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    };

    //gogle logIn
    const googleLog =()=>{
        return signInWithPopup(auth, provider)
    };

    //logout 
    const logout = () =>{
        setUser(null);
        return signOut(auth)
    };

    //observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            setUser(user);
            
            // Get the ID token to check if the user has admin claim
            const tokenResult = await getIdTokenResult(user);
            console.log(tokenResult);
      
            if (tokenResult.claims.isAdmin) {
              setIsAdmin(true); // Set admin status if user has admin claim
              
            } else {
              setIsAdmin(false); // Otherwise, set it to false
             
            }
          } else {
            setUser(null);
            setIsAdmin(false);
            
          }
          setLoading(false); // Set loading to false after checking auth status
        });
      
        return () => unsubscribe();
      }, []);
      

    const allValue = {
        CreateUser,
        signIn,
        googleLog,
        logout,
        user,
        isAdmin, // Expose admin status
    loading,
    }
    return (
        <AuthContext.Provider value={allValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default Auth_provider;