// import React from "react";
// import {Formik, Form} from "formik";
// import {MdTextFields} from "react-icons/md";
// import {MyTextField} from "../formikFields/FieldsFormik.jsx";


// const validate = values => {
//
//     const errors = {};
//
//
//
//     if (!values.username) {
//
//         errors.username = 'Required';
//
//     } else if (values.username.length > 15) {
//
//         errors.username = 'Must be 15 characters or less';
//
//     }
//
//     if (!values.email) {
//
//         errors.email = 'Required';
//
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//
//         errors.email = 'Invalid email address';
//
//     }
//
//     if (!values.password) {
//
//         errors.password = 'Required';
//
//     } else if (values.password.length > 20) {
//
//         errors.password = 'Must be 20 characters or less';
//
//     }
//
//
//     return errors;
//
// };

// export const Form = React.memo(() => {
//
//
//     const formik = useFormik({
//         initialValues: {
//             username: '',
//             email: "",
//             password: "",
//         },
//         validate,
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
//         {
//             formik.errors.username && formik.touched.username ? <span className={"text-red-500 text-sm"}>{formik.errors.username}</span> : null
//         }
//
//         <label htmlFor={"email"}>Email:</label>
//         <input type="email" id={"email"} {...formik.getFieldProps('email')}
//                placeholder={"x455xSS@gmail.com"}
//                className={"shadow-sm shadow-black py-3 px-5"}/>
//         {
//             formik.errors.email && formik.touched.email? <span className={"text-red-500 text-sm"}>{formik.errors.email}</span> : null
//         }
//
//         <label htmlFor={"password"}>Password:</label>
//         <input type="password" id={"password"} {...formik.getFieldProps('password')}
//                placeholder={'********'}
//                className={"shadow-sm shadow-black py-3 px-5"}/>
//
//         {
//             formik.errors.password && formik.touched.password ? <span className={"text-red-500 text-sm"}>{formik.errors.password}</span> : null
//         }
//
//
//
//         <button type={"submit"} className={"py-3 px-5 bg-black text-white font-bold rounded"}>Send</button>
//     </form>
//
//
// })

// export const FormFormik  = React.memo(() => {
//     return (
//         <Formik initialValues={{
//             job: '',
//             username: ''
//         }
//         }
//         onSubmit={
//             (values, {setSubmitting}) => {
//                 setSubmitting(false);
//                 console.log(values);
//             }
//         }>
//             <Form className="checkoutForm max-w-[500px] mx-auto mb-5 flex flex-col gap-4 m-[50px]">
//                 <MyTextField label={"Jop "} name={"job"} type={"text"} placeholder={"@Accountant, Josef"}>
//                     <MdTextFields />
//                 </MyTextField>
//                 <MyTextField label={"username "} name={"username"} type={"text"} placeholder={"@, Josef"}>
//                     <MdTextFields />
//                 </MyTextField>
//             </Form>
//         </Formik>
//     )
// });