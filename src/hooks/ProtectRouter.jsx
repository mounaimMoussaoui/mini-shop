import React, {useEffect} from "react";
import {useAuthContext} from "../authMangment/AuthContext.js";
import {useNavigate} from "react-router-dom";


export const ProtectRouter = React.memo(({ children }) => {
    const { authStateManagement } = useAuthContext();
    const { user } = authStateManagement;
    const navigate = useNavigate();

    useEffect(() => {

        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    return children;
});