// import React from "react";
// import {useFormik} from "formik";
//
//
//
//
// export const Form = React.memo(() => {
//
//
//     const formik = useFormik({
//         initialValues: {
//             username: '',
//             email: "",
//             password: "",
//         },
//         onSubmit: (values) => {
//             alert(JSON.stringify(values));
//         }
//     });
//
//
//     return <form onSubmit={formik.handleSubmit} className={"flex flex-col gap-4 mt-[100px] mx-auto w-[500px]"}>
//         <label htmlFor={"username"}>Username:</label>
//         <input type="text" id={"username"} {...formik.getFieldProps('username')}
//                placeholder={"@user, Josef"}
//                className={"shadow-sm shadow-black py-3 px-5"}/>
//
//         <label htmlFor={"email"}>Email:</label>
//         <input type="email" id={"email"} {...formik.getFieldProps('email')}
//                placeholder={"x455xSS@gmail.com"}
//                className={"shadow-sm shadow-black py-3 px-5"}/>
//
//         <label htmlFor={"password"}>Password:</label>
//         <input type="password" id={"password"} {...formik.getFieldProps('password')}
//                placeholder={'********'}
//                className={"shadow-sm shadow-black py-3 px-5"}/>
//
//
//         <button type={"submit"} className={"py-3 px-5 bg-black text-white font-bold rounded"}>Send</button>
//     </form>
//
//
// })