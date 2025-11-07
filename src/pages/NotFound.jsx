import React from "react";
import { TbError404Off } from "react-icons/tb";
import {useNavigate} from "react-router-dom";


export const NotFound = React.memo(() => {
    const navigate = useNavigate();

    return <div className="not-found flex flex-col items-center gap-5 mt-[100px] mx-auto w-fit">
        <TbError404Off className="icon text-7xl text-red-500" />
        <h1 className={"text-5xl text-gray-200 font-bold"}>Page Not Found</h1>
        <button type={"button"} className={"px-5 py-3 shadow-red-500 rounded shadow-sm font-bold text-red-600"} onClick={() => { navigate("/"); }}>Contact US</button>
    </div>
});