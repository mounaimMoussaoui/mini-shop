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
//             email: "mail",
//         },
//         onSubmit: (values) => {
//             alert(JSON.stringify(values));
//         }
//     });
//
//
//     return <form onSubmit={formik.handleSubmit} className={"flex flex-col gap-4 mt-[100px] mx-auto w-[500px]"}>
//         <label>Email:</label>
//         <input type="email" name={"email"} value={formik.values.email} onChange={formik.handleChange}  className={"shadow-sm shadow-black py-3 px-5"}/>
//
//         <button type={"submit"} className={"py-3 px-5 bg-black text-white font-bold rounded"}>Send</button>
//     </form>
//
//
// })