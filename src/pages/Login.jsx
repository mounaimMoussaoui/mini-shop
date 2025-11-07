import React from "react";
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

export const Login = React.memo(() => {
    const { authStateManagement, addLogin } = useAuthContext();
    const [login, setLogin] = React.useState(false);
    const navigate  = useNavigate();
    const [message, setMessage] = React.useState({});

    return <>
        <h1 className={"text-5xl font-bold w-fit mx-auto mt-5"}>Login</h1>
        <Formik
        initialValues={{
            email: '',
            password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
            signInWithEmailAndPassword(auth, values.email, values.password).then( (res) => {
                addLogin(res.user);
                navigate("/profile");
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
                <MyTextField type={"email"} id="emailField" label="Email" name={"email"} placeholder={"email@example.com"} >
                    <MdOutlineMail />
                </MyTextField>
                <MyTextField type={"password"} id="passwordField" label="Password" name={"password"} placeholder={"********"}>
                    <TbLockPassword />
                </MyTextField>
                <button type={"submit"}
                className={"py-3 px-5 rounded shadow-lg bg-black font-bold text-white"}
                >Login</button>
            </Form>
        </Formik>
        {
            login && <AlertPopup isAddingCart={login} message={`${message.message} ${authStateManagement.user ? authStateManagement.user.email : ""}`} bgColor={message.color} >
                <CiCircleInfo className={"text-white font-bold"}/>
            </AlertPopup>
        }
    </>
});