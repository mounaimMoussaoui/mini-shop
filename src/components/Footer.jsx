import React from "react";

export const Footer  = React.memo(() => {
    return <footer className="bg-black text-white py-6 text-center">
        <div className="container mx-auto">
            <h1 className={"text-white text-left p-3 font-bold shadow-sm shadow-gray-500"}>Footer</h1>
            <span className={"block p-5 text-white text-sm"}>All Rights Reserved {new Date().getFullYear()} </span>
        </div>
    </footer>

});