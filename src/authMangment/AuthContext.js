import { create } from "zustand";
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";





export const useAuthContext = create((Set) => ({
    authStateManagement: {},

   addLogin: (user) => { Set((state) => ({authStateManagement: {...state.authStateManagement, user} }) )},
    logout: () => Set(() => ({
        authStateManagement: {},
    }), signOut(auth)),
}));