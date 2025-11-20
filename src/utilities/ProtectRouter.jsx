import React, {useEffect} from "react";
import {useAuthContext} from "../authMangment/AuthContext.js";
import {useNavigate} from "react-router-dom";

export const ProtectRouter = React.memo(({ children }) => {
    const { authStateManagement, putOriginSource } = useAuthContext();
    const { user } = authStateManagement;
    const navigate = useNavigate();
    const [dataItems, setDataItems] = React.useState([]);

    useEffect(() => {
        setDataItems(prevState => [...prevState, window.location.href.split("/")[3]]);

        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    useEffect(() => {
        console.log(dataItems[0]);
        putOriginSource(dataItems[0]);
    }, [dataItems]);

    return children;
});