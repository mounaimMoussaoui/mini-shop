import { create } from "zustand";



export const useAuthContext = create((Set) => ({
    authStateManagement: {},

   addLogin: (user) => { Set((state) => ({authStateManagement: {...state.authStateManagement, user} }) )},
}));