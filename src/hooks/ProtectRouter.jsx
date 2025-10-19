import React, {useEffect} from "react";
import {useAuthContext} from "../authMangment/AuthContext.js";
import {useNavigate} from "react-router-dom";


export const ProtectRouter = React.memo(({ children }) => {
    const { authStateManagement } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {

        if (!authStateManagement?.user) {
            navigate(-1);
            return null;
        }
    }, [authStateManagement, navigate]);

    return children;
});