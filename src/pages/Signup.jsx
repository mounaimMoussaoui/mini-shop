import React, {useCallback} from "react";
import {auth} from "../firebase.js";
import {Form, Formik} from "formik";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {signUpSchema} from "../schemas/SignUpSchema.js";
import {MdOutlineMail} from "react-icons/md";
import {TbLockPassword} from "react-icons/tb";
import {MyTextField} from "../formikFields/TextField.jsx";

export const Signup = React.memo(() => {

    const handleSubmit = useCallback((values) => {
        createUserWithEmailAndPassword(auth, values.email, values.password).then((res) => {
            console.log(res);
        }).catch((rej) => {
            console.error(rej.message);
        });
    }, []);

    return <>
        <h1 className={"mx-auto block p-5 font-bold text-5xl w-fit"}>Sign UP</h1>
        <Formik initialValues={{
            email: "",
            password: ""
        }}
        validationSchema={signUpSchema}
        onSubmit={(values, {setSubmitting}) => {
            handleSubmit(values);
            setSubmitting(false);
        }}>
            <Form className={"mt-[100px] max-w-[500px] mx-auto form flex flex-col gap-4"}>
                <MyTextField type={"email"} id={"email"} name={"email"} placeholder={"example@gmail.com"}
                             label={"Email :"}><MdOutlineMail/> </MyTextField>
                <MyTextField type={"password"} id={"password"} name={"password"} placeholder={"********"}
                             label={"Password :"}> <TbLockPassword/> </MyTextField>
                <button type={"submit"} className={"px-5 py-3 bg-black w-full rounded text-white font-bold"}>Submit
                </button>
            </Form>
        </Formik>
    </>
});


// <form onSubmit={formik.handleSubmit} className="mt-[100px] max-w-[500px] mx-auto form flex flex-col gap-4 items-center">
//     <div className="group flex flex-col gap-2 w-full">
//         <label htmlFor="emailField" className={"font-bold"}>Email :</label>
//         <div className={"relative w-full min-h-12"}>
//             <input type="email" id={"emailField"} name="email"
//                    value={formik.values.email}
//                    onChange={formik.handleChange}
//                    onBlur={formik.handleBlur}
//                    placeholder={"email@example.com"}
//                    className={"shadow-sm shadow-black py-3 px-11 w-full h-full absolute rounded focus:outline-none transition ease-in-out focus:shadow-cyan-800"}/>
//             <MdOutlineMail className={"absolute text-2xl left-[10px] top-[50%] -translate-y-[50%]"}/>
//         </div>
//         {formik.errors.email && formik.touched.email ?
//             <span className={"text-red-500 text-sm"}>{formik.errors.email}</span> : null}
//     </div>
//     <div className="group flex flex-col gap-2 w-full">
//         <label htmlFor="passField" className={"font-bold"}>Password :</label>
//         <div className={"relative w-full min-h-12"}>
//             <input type="password" id={"passField"} name="password"
//                    value={formik.values.password}
//                    onBlur={formik.handleBlur}
//                    onChange={formik.handleChange}
//                    placeholder={"password"}
//                    className={"shadow-sm shadow-black py-3 px-11 w-full h-full absolute rounded focus:outline-none transition ease-in-out focus:shadow-cyan-800"}/>
//             <TbLockPassword className={"absolute text-2xl left-[10px] top-[50%] -translate-y-[50%]"}/>
//         </div>
//         {formik.errors.password && formik.touched.password ?
//             <span className={"text-red-500 text-sm"}>{formik.errors.password}</span> : null}
//     </div>
//     <button type={"submit"} className={"px-5 py-3 bg-black w-full rounded text-white font-bold"}>Submit</button>
// </form>
//
// <MyTextField type={"text"} id={"username"} name={"username"} placeholder={"User Name"}
//              label={"Username :"}><FaRegUser/> </MyTextField>

