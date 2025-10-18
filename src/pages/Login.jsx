import React, {useEffect} from "react";
import { auth  } from "../firebase.js";
import {Form, Formik, useField} from "formik";
import { signInWithEmailAndPassword } from "firebase/auth"
import {signUpSchema} from "../schemas/SignUpSchema.js";
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineMail } from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci";
import {AlertPopup} from "./AlertPopup.jsx";
import { useAuthContext} from "../authMangment/AuthContext.js"


const MyTextField = ({label, children, ...props}) => {

    const [field, meta] = useField(props);
    return  (<>
        <label htmlFor={props.id || props.name}
            className={"text-xl font-bold"}
            >{label}</label>
        <div className="relative w-full h-[50px]">
            <span className={`absolute top-[50%] left-[8px] translate-y-[-50%] text-2xl z-10 ${meta.touched && meta.error ? "text-red-500" : "text-green-500"}`}>{children}</span>
            <input
                className={`input-form py-3 px-[40px] shadow-lg rounded-sm absolute min-w-full min-h-full transition ease-in-out focus:outline-none focus:border-b-2 ${meta.touched && meta.error ? 'focus:border-b-red-500' : 'border-green-500'}`}
                {...field} {...props} />
        </div>
        {
            meta.touched && meta.error ? ( <span className={"text-sm text-red-500 "}>{meta.error}</span> ) : null
        }
    </>)
};


export const Login = React.memo(() => {
    const { authStateManagement, addLogin } = useAuthContext();
    const [login, setLogin] = React.useState(false);

    useEffect(() => {
        setLogin(true);
        setTimeout(() => {
            setLogin(false);
        }, 1000);
    }, [authStateManagement]);

    return <>
        <h1 className={"text-5xl font-bold w-fit mx-auto mt-5"}>Login</h1>
        <Formik
        initialValues={{
            email: '',
            password: '',
        }}
        validationSchema={signUpSchema}
        onSubmit={(values, { setSubmitting }) => {
            signInWithEmailAndPassword(auth, values.email, values.password).then( (res) => {
                addLogin(res.user);
            }).catch((rej) => {
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
            login && <AlertPopup isAddingCart={login} message={`Login Success ${authStateManagement?.user?.email}`} bgColor={"bg-green-600"} >
                <CiCircleInfo className={"text-white font-bold"}/>
            </AlertPopup>
        }
    </>
});