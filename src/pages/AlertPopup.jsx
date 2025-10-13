import {FaCartPlus} from "react-icons/fa";
import React from "react";


export const AlertPopup = React.memo(({isAddingCart, children, message, bgColor}) => {
    return <div className={`alert-box absolute top-[20px] right-[20px] z-10 transition-[0.3s] ease-in-out p-5 ${bgColor} rounded shadow-lg flex items-center gap-5 ${isAddingCart ? "top-[15px] opacity-100" : "opacity-0"}`}>
        {
            children
        }
        <p className={"text-lg text-white"}>{message}</p>
    </div>
})