import React from "react";
import {NavBar} from "../components/NavBar.jsx";
import {Outlet} from "react-router-dom";
import {Footer} from "../components/Footer.jsx";

export const MainLayout = React.memo(() => {
    return <>
        <NavBar/>
            <section className="container-fluid min-h-[90vh] p-5 sm:p-0">
                <Outlet/>
            </section>
        <Footer/>
    </>
});