import React, {useCallback, useEffect} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {IoCartSharp, IoCreateOutline, IoHome, IoLogIn} from "react-icons/io5";
import {CgProfile} from "react-icons/cg";
import {FaBars} from "react-icons/fa";
import {useCartStore} from "../store/cartStore.js";
import {useAuthContext} from "../authMangment/AuthContext.js";
import { MdLogout } from "react-icons/md";
import {motion} from "framer-motion"

export const NavBar = React.memo(() => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { cart } = useCartStore();
    const { authStateManagement, logout } = useAuthContext();
    const [login, setLogin] = React.useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(authStateManagement.user){
            setLogin(true);
        } else {
            setLogin(false)
        }
    }, [authStateManagement]);

    const activeLink = useCallback(({isActive}) => {
        const active = isActive ? "text-orange-900 font-bold sm:scale-110 sm:text-sky-900" : "";
        return `flex items-center gap-x-5 px-5 py-3 text-[18px] sm:p-2 sm:gap-x-1 sm:text-[16px] ${active}`;
}, []);

    const handleClick = useCallback(() => {
        setIsMenuOpen(!isMenuOpen);
    }, [isMenuOpen]);

    const handleAuthClick = useCallback(async () => {
        await logout();
        navigate("/login");
    }, [logout, navigate]);

    return <motion.nav initial={{opacity: 0}} animate={{opacity: 1, transition: {type: "spring", delay: 0.3}}}
                       role="navigation" aria-label="Main navigation" className="flex items-center gap-5 p-5 bg-white z-10 shadow-sm shadow-black h-[90px] sticky top-0">
        <motion.div initial={{ y: 5 }} animate={{ y: 0 , transition: { duration: 0.3, type: "spring" } }} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className="logo whitespace-nowrap transition-[0.3s] font-bold uppercase ms:tracking-wide sm:text-xl sm:w-[fit-content] text-white bg-amber-500 p-3 rounded shadow-sm shadow-amber-300">
            <NavLink to={'/'}>
                Mini-Shop
            </NavLink>
        </motion.div>
        <motion.ul initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0, transition: { type: "spring", duration: 0.5 } }} className={`bg-amber-500 -z-10 ${isMenuOpen ? "opacity-1 top-[90px]" : "opacity-0 top-[80px] pointer-events-none"} transition-[0.3s] flex-col text-white absolute py-5 left-0 w-full sm:opacity-100 ms:z-10 sm:pointer-events-auto items-center sm:flex sm:top-0 sm:relative sm:bg-transparent sm:text-black sm:flex-row sm:w-fit-content sm:flex-1 sm:justify-between md:gap-x-5 md:justify-end`}>
            <motion.li whileHover={{ scale: 1.1 }} transition={{ type: "spring", duration: 0.5 }} whileTap={{scale: 0.9}}>
                <NavLink to="/" className={activeLink}><IoHome/> Home</NavLink>
            </motion.li>
            <motion.li className={"relative"} whileHover={{ scale: 1.1 }} transition={{ type: "spring", duration: 0.5 }} whileTap={{scale: 0.9}}>
                <NavLink to="/cart" className={activeLink}><IoCartSharp/> Cart</NavLink>
                {
                    cart.length ?
                    <span
                        className="absolute -top-0 left-3 text-[10px] px-1 transition-[0.3s] bg-red-500 text-white rounded-full sm:-top-3 sm:-left-2 sm:text-sm sm:px-2">{cart.length}</span>
                    : null
                }
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }} transition={{ type: "spring", duration: 0.5 }} whileTap={{scale: 0.9}}>
                <NavLink to="/profile" className={activeLink}> <CgProfile/> Profile</NavLink>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }} transition={{ type: "spring", duration: 0.5 }} whileTap={{scale: 0.9}}>
                {
                    login ? null
                          :  <NavLink to="/signup" className={activeLink}><IoCreateOutline/> Signup</NavLink>
                }
            </motion.li>
            {/*<li>*/}
            {/*    <NavLink to="/formFormik" className={activeLink}><IoCreateOutline/> Form Formik</NavLink>*/}
            {/*</li>*/}
            <motion.li whileHover={{ scale: 1.1 }} transition={{ type: "spring", duration: 0.5 }} whileTap={{scale: 0.9}}>
                {
                    login ? <button className={"py-1 px-5 rounded bg-black text-white flex gap-2 items-center"}
                                    onClick={handleAuthClick}><MdLogout className={"text-white"}/>Logout</button>
                           : <NavLink to="/login" className={activeLink}><IoLogIn/> Login</NavLink>
                }
            </motion.li>
        </motion.ul>
        <div className={"flex ml-auto text-3xl cursor-pointer sm:hidden"} onClick={handleClick}>
            <FaBars/>
        </div>
    </motion.nav>
});