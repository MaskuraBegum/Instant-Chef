import React, { createContext, useEffect, useState } from 'react';
import {  createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from '../firebase/firebase.config';
import { GoogleAuthProvider } from 'firebase/auth';

export const AuthContext = createContext(null);

const provider = new GoogleAuthProvider();

const Auth_provider = ({children}) => {
    const [user,setUser] = useState(null)
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
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user)
              
            } 
          });
    },[])

    const allValue = {
        CreateUser,
        signIn,
        googleLog,
        logout,
        user
    }
    return (
        <AuthContext.Provider value={allValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default Auth_provider;