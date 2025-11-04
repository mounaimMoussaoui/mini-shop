import { create } from "zustand";
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";

export const useAuthContext = create((set) => ({
    authStateManagement: {},
    addLogin: (user) => set((s) => ({ authStateManagement: { ...s.authStateManagement, user } })),
    logout: async () => {
        try {
            await signOut(auth);
            set(() => ({ authStateManagement: {} }));
        } catch (err) {
            console.error("Logout failed:", err);
        }
    },
}));