import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export default function AuthProvider({children}) {
    const signUpData = JSON.parse(localStorage.getItem('Study-verse-signup'))
    const isLoggedIn = localStorage.getItem('Study-verse-login')

    return (
        <AuthContext.Provider value={{signUpData, isLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}