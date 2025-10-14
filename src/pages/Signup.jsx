import React, {useEffect} from "react";
import { auth } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const Signup = React.memo(() => {

    useEffect(() => {
        createUserWithEmailAndPassword(auth, "testing@example.com", "testing123").then((res) => {
            console.log(res);
        }).catch((rej) => {
            console.error(rej.message);
        })
    }, []);

    return <h1>Signup</h1>
});