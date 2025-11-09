import { create } from "zustand";


// import initFirebase from "../firebase.js";


// import { signOut } from "firebase/auth";
// await signOut(auth);


export const useAuthContext = create((set) => ({
    authStateManagement: {},
    addLogin: (user) => set((s) => ({ authStateManagement: { ...s.authStateManagement, user } })),
    logout: async () => {
        try {
            //
            // initFirebase().then((res) => {
            //     console.log(res);
            // });

            set(() => ({ authStateManagement: {} }));
        } catch (err) {
            console.error("Logout failed:", err);
        }
    },
}));