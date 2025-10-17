import React, {useCallback} from "react";
import { auth } from "../firebase.js";
import { useFormik } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {signUpSchema} from "../schemas/SignUpSchema.js";

export const Signup = React.memo(() => {

    const handleSubmit = useCallback((values) => {
        createUserWithEmailAndPassword(auth, values.email, values.password).then((res) => {
            console.log(res);
        }).catch((rej) => {
            console.error(rej.message);
        });
    }, []);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: signUpSchema,
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    return <>
        <h1 className={"mx-auto block p-5 font-bold text-5xl w-fit"}>Sign UP</h1>
        <form onSubmit={formik.handleSubmit} className="mt-[100px] max-w-[500px] mx-auto form flex flex-col gap-4 items-center">
            <div className="group flex flex-col gap-2 w-full">
                <label htmlFor="emailField" className={"font-bold"}>Email :</label>
                <input type="email" id={"emailField"} name="email"
                       value={formik.values.email}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       placeholder={"email@example.com"}
                       className={"shadow-sm shadow-black py-3 px-5 rounded focus:outline-none transition ease-in-out focus:shadow-cyan-800"}/>
                { formik.errors.email && formik.touched.email ? <span className={"text-red-500 text-sm"}>{formik.errors.email}</span> : null}
            </div>
            <div className="group flex flex-col gap-2 w-full">
                <label htmlFor="passField" className={"font-bold"}>Password :</label>
                <input type="password" id={"passField"} name="password"
                       value={formik.values.password}
                       onBlur={formik.handleBlur}
                       onChange={formik.handleChange}
                       placeholder={"password"}
                       className={"shadow-sm shadow-black py-3 px-5 rounded focus:outline-none transition ease-in-out focus:shadow-cyan-800"}/>
                { formik.errors.password && formik.touched.password ? <span className={"text-red-500 text-sm"}>{formik.errors.password}</span> : null}
            </div>
            <button type={"submit"} className={"px-5 py-3 bg-green-400 rounded text-white font-bold"}>Submit</button>
        </form>
    </>
});


