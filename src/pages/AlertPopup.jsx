import React from "react";
import { motion } from "framer-motion";

export const AlertPopup = React.memo(({isAddingCart, children, message, bgColor}) => {
    return <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "fit-content", transition: { type: "spring" } }} className={`alert-box fixed top-[110px] right-[20px] z-10 transition-[0.3s] ease-in-out p-5 ${bgColor} rounded shadow-lg flex items-center gap-5 ${isAddingCart ? "top-[95px] opacity-100" : "opacity-0"}`}>
        {
            children
        }
        <motion.p initial={{ fontSize: 0, opacity: 0 }} animate={{ opacity: 1, fontSize: "1rem", transition: { duration: 0.5, delay: 0.3 } }} className={"text-lg text-white"}>{message}</motion.p>
    </motion.div>
})