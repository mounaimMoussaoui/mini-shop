import React from "react";
import {NavBar} from "../components/NavBar.jsx";
import {Outlet} from "react-router-dom";
import {Footer} from "../components/Footer.jsx";
import { motion } from "framer-motion";

export const MainLayout = React.memo(() => {
    return <>
        <NavBar/>
            <motion.section initial={{opacity: 0}} animate={{ opacity: 1, transition: { type: "spring", delay: 0.3 } }} className="container-fluid min-h-[90vh] p-5 sm:p-0">
                <Outlet/>
            </motion.section>
        <Footer/>
    </>
});