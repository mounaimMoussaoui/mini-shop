import React, {useEffect} from "react";
import { auth  } from "../firebase.js";
import { Form, Formik } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LoginSchema } from "../schemas/LoginSchema.js";
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineMail } from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci";
import { AlertPopup } from "./AlertPopup.jsx";
import { useAuthContext } from "../authMangment/AuthContext.js"
import { MyTextField } from "../formikFields/FieldsFormik.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Login = React.memo(() => {
    const { authStateManagement, addLogin, originSource } = useAuthContext();
    const [login, setLogin] = React.useState(false);
    const navigate  = useNavigate();
    const [message, setMessage] = React.useState({});
    const [originSrc, setOriginSrc] = React.useState("");

    useEffect(() => {
        setOriginSrc(originSource);
    }, [originSource]);

    return <motion.article initial={{scale: 0}} animate={{ scale: 1, transition: { type: 'spring' } }}>
        <motion.h1 initial={{scale: 0}} animate={{ scale: 1, transition: { type: 'spring', delay: 0.2 } }} className={"text-5xl font-bold w-fit mx-auto mt-5"}>Login</motion.h1>
        <Formik
        initialValues={{
            email: '',
            password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
            signInWithEmailAndPassword(auth, values.email, values.password).then( (res) => {
                addLogin(res.user);
                navigate(`/${originSrc}`);
                setLogin(true);
                setMessage(prev =>  { return { ...prev, message: "logged successfully", color: "bg-green-600" } });
            }).catch((rej) => {
                setLogin(true);
                setMessage(prev =>  { return { ...prev, message: "Error", color: "bg-red-600" } });
                console.error(rej.message);

            });
            setSubmitting(false);
        }}
        >
            <Form className={"flex flex-col gap-4 max-w-[500px] mx-auto mt-[50px]"}>
                <motion.div initial={{scale: 0, opacity: 0}}
                            animate={{scale: 1, opacity: 1, transition: {type: "spring", delay: 0.2}}}>
                    <MyTextField type={"email"} id="emailField" label="Email" autoComplete={"email-user"} name={"email"}
                                 placeholder={"email@example.com"}>
                        <MdOutlineMail/>
                    </MyTextField>
                </motion.div>
                <motion.div initial={{scale: 0, opacity: 0}}
                            animate={{scale: 1, opacity: 1, transition: {type: "spring", delay: 0.2}}}>
                    <MyTextField type={"password"} id="passwordField" label="Password" autoComplete={"current-password"}
                                 name={"password"} placeholder={"********"}>
                        <TbLockPassword/>
                    </MyTextField>
                </motion.div>
                <motion.button initial={{scale: 0}} animate={{scale: 1, transition: { type: "spring", delay: 0.2 } }} whileHover={{scale: 0.9}} whileTap={{scale: 1.1}} type={"submit"}
                               className={"py-3 px-5 rounded shadow-lg bg-black font-bold text-white"}
                >Login
                </motion.button>
            </Form>
        </Formik>
        {
            login && <AlertPopup isAddingCart={login} message={`${message.message} ${authStateManagement.user ? authStateManagement.user.email : ""}`} bgColor={message.color} >
                <CiCircleInfo className={"text-white font-bold"}/>
            </AlertPopup>
        }
    </motion.article>
});