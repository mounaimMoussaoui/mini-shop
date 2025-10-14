import React, { useEffect } from "react";
import { auth  } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth"


export const Login = React.memo(() => {
    useEffect(() => {
        console.log(auth)
        signInWithEmailAndPassword(auth, "testing@example.com", "testing123").then( (res) => {
            console.log(res)
        } ).catch((rej) => {
            console.error(rej);
        })
    }, []);

    return <h1>Login</h1>
});