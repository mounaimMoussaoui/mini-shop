import React from "react";
import {useAuthContext} from "../authMangment/AuthContext.js";


export const Profile = React.memo(() => {

    const { authStateManagement } = useAuthContext();

    return <>
        <h1 className={"py-3 w-fit mx-auto font-bold text-gray-400 text-5xl"}>Profile</h1>
        <div className={"w-fit mx-auto my-[100px] text-sm"}>Welcome {authStateManagement.user.username}</div>
    </>
});