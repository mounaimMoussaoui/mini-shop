import React from "react";

export const Footer  = React.memo(() => {
    return <footer className="footer bg-black p-y-10 text-center ">
        <h1 className={"text-white text-left p-3 font-bold shadow-sm shadow-gray-500"}>Footer</h1>
        <span className={"block p-5 text-white text-sm"}>All Rights Reserved {new Date().getFullYear()} </span>
    </footer>
});